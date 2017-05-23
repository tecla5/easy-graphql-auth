const defaultKeyNames = {
  auth0TokenStorageKey: 'auth0Token',
  graphCoolTokenStorageKey: 'graphCoolToken'
}

import {
  Store
} from './store'

const errorCode = {
  USER_ALREADY_EXISTS: 3023
}

export class Lock {
  // storage: { // localstorage
  //   auth0IdToken: 'xxx', // key to store auth0IdToken
  //   graphcoolToken: 'xxx' // key to store graphcoolToken
  // },
  // auth0: { // from auth0 client app settings
  //   domain: 'xxx', // Your auth0 domain
  //   clientId: 'xxx' // // Your auth0 client id
  // }
  constructor(config, opts = {}) {
    console.log('config', config, config.config)
    this.validate(config)
    const {
      Auth0Lock,
      auth0,
      keyNames,
      queries,
      store,
      storage,
      lockConfig,
      createLockUi,
      displayMethod
    } = config || {}
    // defaults
    this.logging = opts.logging

    this.displayMethod = displayMethod || 'getUserInfo'
    this.queries = queries || {}
    let _createLockUi = createLockUi || this.defaultCreateLockUi
    this.keyNames = keyNames || storage || defaultKeyNames
    console.log('keyNames', this.keyNames)

    this.store = store || this.defaultCreateStore(this.keyNames, opts)
    this.tokens = this.store.getAll()
    this.io = opts.io || console
    this.observers = {}
    this.lockConfig = lockConfig || auth0.lock || this.defaultLockConfig
    this.lock = _createLockUi(auth0, opts)
    this.onHashParsed()
    console.log('lock', this.lock)
  }

  get defaultLockConfig() {
    return {}
    // return {
    //   auth: {
    //     redirect: false
    //   },
    //   autoclose: true
    // }
  }

  defaultCreateLockUi(auth0 = {}, opts) {
    console.log('create lock', auth0, opts)
    return new Auth0Lock(auth0.clientId, auth0.domain, opts)
  }

  defaultCreateStore(keyNames, opts) {
    return new Store(keyNames, opts)
  }

  validate(config) {}

  enableLog() {
    this.logging = true
    return this
  }

  disableLog() {
    this.logging = false
    return this
  }

  log(...msgs) {
    if (this.logging) {
      this.io.log('Lock', ...msgs)
    }
  }

  error(...msgs) {
    if (this.logging) {
      this.io.error('Lock', ...msgs)
    }
  }

  get auth0IdTokenKeyName() {
    return this.store.auth0IdTokenKeyName
  }

  get gcTokenKeyName() {
    return this.store.gcTokenKeyName
  }

  getAuth0Token() {
    return this.store.getItem(this.auth0IdTokenKeyName)
  }

  setAuth0Token(auth0Token) {
    this.store.setItem(this.auth0IdTokenKeyName, auth0Token);
    return this
  }

  setGraphCoolToken(signinToken) {
    // set graphcool token in localstorage
    this.store.setItem(this.gcTokenKeyName, signinToken)
    return this
  }

  onHashParsed() {
    this.lock.on('hash_parsed', (authResult) => {
      this.log('hash parsed', {
        authResult
      });
      if (authResult == null) {
        if (this.getAuth0Token() == null) {
          this.showLock();
        }
      } else {
        this.log('setting auth token', {
          authResult
        });
        if (authResult.idToken) {
          this.setAuth0Token(authResult.idToken)
          this.log('success', authResult);
        } else {
          this.error('authResult missing idToken')
        }
      }
    })
    return this
  }

  on(eventName, observer) {
    this.log('on', eventName, observer)
    let slot = this.observers[eventName] || []
    this.observers[eventName] = slot.concat(observer)
    return this
  }

  publish(eventName, args) {
    this.log('publish', eventName, args)
    let observers = this.observers[eventName] || []
    if (observers) {
      observers.map(observer => observer(args))
    } else {
      this.log('no observers registered for', eventName)
    }
    return this
  }

  logout() {
    this.log('logout');
    this.resetTokens()
    this.resetStorage()
    this.publish('loggedOut')
    this.loggedOut()
    return this
  }

  loggedOut() {
    this.log('logged out');
  }

  resetTokens() {
    this.log('resetTokens')
    this.tokens = {
      auth0Token: null,
      graphcoolToken: null,
    }
    return this
  }

  resetStorage() {
    this.log('resetStorage');
    this.store.resetAll()
    return this
  }

  // display lock popup
  showLock(config) {
    let displayConfig = config || this.defaultLockConfig
    displayConfig = Object.assign({}, displayConfig, this.lockConfig || {})
    this.log('showLock', displayConfig);
    this.lock.show(displayConfig)
    return this
  }

  handleProfileError(err) {
    this.error(err);
  }

  handleProfile(data) {
    let {
      authResult,
      profile
    } = data
    this.log('handleProfile', data)
    let auth0Token = this.extractAuthToken(authResult)
    this.onAuth0Login({
      auth0Token,
      profile
    })
  }

  subscribeAuthenticated(cb) {
    this.log('config');
    this.lock.on('authenticated', cb || this.onAuthenticated.bind(this))
    return this
  }

  extractAuthToken(authResult) {
    return authResult.accessToken
  }

  onAuthenticated(authResult) {
    this.log('onAuthenticated', authResult)
    let auth0Token = this.extractAuthToken(authResult)
    this.lock[this.displayMethod](auth0Token, this.createProfileReceivedCb(authResult).bind(this))
  }

  createProfileReceivedCb(authResult) {
    return (err, profile) => {
      err ? this.handleProfileError(err) : this.handleProfile({
        authResult,
        profile
      })
    }
  }

  async onAuth0Login(data) {
    let {
      auth0Token,
      profile
    } = data
    this.log('onAuth0Login', data)
    this.setAuth0Token(auth0Token)
    // once authenticated, signin to graphcool
    await this.signinGraphcool(data)
  }

  extractSignedInUserToken(signinResult) {
    return signinResult.data.signinUser.token
  }

  async signinGraphcool(data) {
    let {
      auth0Token,
      profile
    } = data
    try {
      this.log('Signing into Graphcool');
      let created = await this.doCreateUser(data)
      const signinResult = await this.doSigninUser(data)
      const signinToken = this.extractSignedInUserToken(signinResult)
      this.setGraphCoolToken(signinToken)
      this.publish('signedIn', data)
      this.signedInOk(data)
    } catch (err) {
      let errArgs = Object.assign(data, {
        err
      })
      this.publish('signedInFailure', data)
      this.signedInFailure(data)
      this.handleSigninError(data)
    }
  }

  signedInFailure({
    err,
    profile
  }) {
    this.log('signedInFailure', err)
  }

  signedInOk(data) {
    this.log('signedInOk', data)
  }

  handleError(err) {
    this.error(err)
    throw err
  }

  handleSigninError(err) {
    this.handleError(err)
  }

  handleQueryError(err) {
    if (!err.graphQLErrors ||
      err.graphQLErrors[0].code !== errorCode.USER_ALREADY_EXISTS
    ) {
      this.handleError(err)
    }
  }

  buildUserData({
    auth0Token,
    profile
  }) {
    return {
      variables: {
        authToken: auth0Token,
        name: profile.name
      }
    }
  }

  async doCreateUser(data) {
    let {
      auth0Token,
      profile
    } = data
    // create user if necessary
    try {
      this.log('Create user', name);
      let userData = this.buildUserData(data)
      if (this.queries.createUser) {
        await this.queries.createUser(userData)
      } else {
        this.log('missing createUser query, faking it')
        await this.fakeCreateUser(userData)
      }
    } catch (err) {
      this.handleQueryError(err)
    }
  }

  // TODO: simulate GraphCool query mutation result?
  fakeCreateUser(userData) {
    return userData
  }

  buildSigninUserData({
    auth0Token,
    profile
  }) {
    return {
      variables: {
        authToken: auth0Token
      }
    }
  }

  // sign in user
  async doSigninUser(data) {
    let {
      auth0Token,
      profile
    } = data
    this.log('signin user', data);
    if (!this.queries.signinUser) {
      return this.fakeSigninUser()
    }
    let userData = this.buildSigninUserData(data)
    return await this.queries.signinUser(userData)
  }

  async fakeSigninUser() {
    this.log('returning fake signedinUser')
    return {
      data: {
        signinUser: {
          token: '1234'
        }
      }
    }
  }
}

export function createLock(config) {
  return new Lock(config)
}