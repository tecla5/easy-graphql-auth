const defaultKeyNames = {
  auth0TokenStorageKey: 'auth0Token',
  graphCoolTokenStorageKey: 'graphCoolToken'
}

import Store from './store'

const errorCode = {
  USER_ALREADY_EXISTS: 3023
}

class Lock {
  // storage: { // localstorage
  //   auth0IdToken: 'xxx', // key to store auth0IdToken
  //   graphcoolToken: 'xxx' // key to store graphcoolToken
  // },
  // auth0: { // from auth0 client app settings
  //   domain: 'xxx', // Your auth0 domain
  //   clientId: 'xxx' // // Your auth0 client id
  // }
  constructor(config, opts = {}) {
    this.validate(config)
    const {
      Auth0Lock,
      auth0,
      keyNames,
      queries,
      store,
      storage,
      lockConfig
    } = config || {}
    // defaults
    this.queries = queries
    this.lock = new Auth0Lock(auth0.clientId, auth0.domain)
    this.keyNames = keyNames || storage || defaultKeyNames
    this.logging = opts.logging
    this.store = store || new Store(this.keyNames, opts)
    this.tokens = this.store.getAll()
    this.io = opts.io || console
    this.observers = {}
    this.lockConfig = lockConfig || auth0.lock
  }

  validate(config) {}

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

  on(eventName, observer) {
    let slot = this.observers[eventName] || []
    this.observers[eventName] = slot.concat(observer)
  }

  publish(eventName, args) {
    let observers = this.observers[eventName] || []
    obervers.map(observer => observer(args))
  }

  logout() {
    this.log('Logging out');
    this.resetTokens()
    this.resetStorage()
    this.publish('loggedOut')
    this.loggedOut()
    return this
  }

  resetTokens() {
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
  showLogin(config = {}) {
    this.log('showLogin');
    config = Object.assign({}, config, this.lockConfig || {})
    this.lock.show(config)
    return this
  }

  handleProfileError(err) {
    this.error(err);
  }

  handleProfile({
    authResult,
    profile
  }) {
    this.onAuth0Login({
      auth0Token: authResult.idToken,
      profile: profile
    })
  }

  subscribeAuthenticated(cb) {
    this.log('config');
    this.lock.on('authenticated', cb || this.onAuthenticated)
    return this
  }

  onAuthenticated(authResult) {
    this.lock.getProfile(authResult.idToken, this.createProfileReceivedCb(authResult))
  }

  createProfileReceivedCb(authResult) {
    return (err, profile) => {
      err ? this.handleProfileError(err) : this.handleProfile({
        authResult,
        profile
      })
    }
  }

  storeAuth0Token(auth0Token) {
    this.store.setValue(this.keyNames.auth0TokenKeyName, auth0Token)
    return this
  }

  async onAuth0Login({
    auth0Token,
    profile
  }) {
    let args = {
      auth0Token,
      profile
    }
    this.log('logged in', args)
    this.storeAuth0Token(auth0Token)
    // once authenticated, signin to graphcool
    await this.signinGraphcool(args)
  }

  async signinGraphcool({
    auth0Token,
    profile
  }) {
    let args = {
      auth0Token,
      profile
    }
    try {
      this.log('Signing into Graphcool');
      await this.doCreateUser(args)
      const signinResult = await this.doSigninUser(args)
      const signinToken = signinResult.data.signinUser.token
      this.storeGraphCoolToken(signinToken)
      this.publish('signedIn', args)
      this.signedInOk(args)
    } catch (err) {
      let errArgs = Object.assign(args, {
        err
      })
      this.publish('signedInFailure', args)
      this.signedInFailure(args)
      this.handleSigninError(args)
    }
  }

  signedInFailure({
    err,
    profile
  }) {
    this.log('signedInFailure', err)
  }

  signedInOk({
    auth0Token,
    profile
  }) {
    this.log('signedInOk', {
      auth0Token,
      profile
    })
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

  async doCreateUser({
    auth0Token,
    profile
  }) {
    let name = profile.name
    // create user if necessary
    try {
      this.log('Create user', name);
      await this.queries.createUser({
        variables: {
          authToken: auth0Token,
          name: name
        }
      })
    } catch (err) {
      this.handleQueryError(err)
    }
  }

  // sign in user
  async doSigninUser({
    auth0Token,
    profile
  }) {
    return await this.queries.signinUser({
      variables: {
        authToken: auth0Token
      }
    })
  }

  storeGraphCoolToken(signinToken) {
    // set graphcool token in localstorage
    this.store.setValue(this.keyNames.graphCoolTokenKeyName, signinToken)
    return this
  }
}

function createLock(config) {
  return new Lock(config)
}

export default {
  createLock,
  Lock
}