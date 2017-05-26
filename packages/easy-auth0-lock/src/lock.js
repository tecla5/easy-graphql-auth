import {
  Store,
  Configurable,
  keyNames
} from '@tecla5/token-foundation'

import extend from 'deep-extend'

const errorCode = {
  USER_ALREADY_EXISTS: 3023
}

export class Lock extends Configurable {
  // storage: { // localstorage
  //   auth0IdToken: 'xxx', // key to store auth0IdToken
  //   graphcoolToken: 'xxx' // key to store graphcoolToken
  // },
  // auth0: { // from auth0 client app settings
  //   domain: 'xxx', // Your auth0 domain
  //   clientId: 'xxx' // // Your auth0 client id
  // }
  constructor(config = {}, opts = {}) {
    super(config, opts)
    const {
      title,
      logo,
      theme,
      dict,
      keyNames,
      queries,
      store,
      storage,
      gqlServer,
      client,
      connection,
      lockConfig,
      createLockUi,
      createGraphQLServerAuth,
      displayMethod
    } = config

    let {
      createConnection,
    } = opts

    if (opts.clientConfig) {
      createConnection = createConnection || opts.clientConfig.createConnection
    }

    let {
      Auth0Lock,
      createLock
    } = opts.lockConfig

    this.Auth0Lock = Auth0Lock || config.Auth0Lock || opts.Auth0Lock

    this.displayMethod = displayMethod || 'getUserInfo'
    let _createLockUi = createLock || createLockUi || this.defaultCreateLockUi
    this.lockConfig = lockConfig || auth0.lock || this.defaultLockConfig

    // GraphQL client/connection used for mutation queries
    this.client = client
    this.connection = connection

    this.queries = queries || {}
    this.gqlServer = gqlServer || {}

    this.createConnection = createConnection
    this._createGraphQLServerAuth = config.createGraphQLServerAuth

    this.theme = theme || {}
    this.theme.logo = this.theme.logo || logo
    this.dict = dict || {}
    this.dict.title = this.dict.title || title
    this.setupLockConfig()
    this.auth0 = extractAuth0config(config)
    if (this.auth0) {
      this.lock = _createLockUi(this.auth0, opts).bind(this)
    } else {
      this.configError('missing auth0 entry in auth entry of config object')
    }

    this.onHashParsed()
  }

  extractAuth0config(config = {}) {
    return config.auth.auth0 || config.auth0
  }

  setupLockConfig() {
    this.lockConfig = extend(this.defaultLockConfig, this.lockConfig)
  }

  get hasGraphQLConnection() {
    return typeof this.connection === 'object'
  }

  get defaultTheme() {
    return this.theme || {}
  }

  get defaultLockConfig() {
    return {
      theme: this.defaultTheme || {}
    }, {
      languageDictionary: this.dict || {}
    }
  }

  defaultCreateLockUi(auth0 = {}, opts) {
    this.log('create lock', auth0, opts)
    return new this.Auth0Lock(auth0.clientId, auth0.domain, opts)
  }

  get auth0IdTokenKeyName() {
    return this.store.auth0IdTokenKeyName
  }

  getAuth0Token() {
    return this.store.getItem(this.auth0IdTokenKeyName)
  }

  setAuth0Token(auth0Token) {
    this.store.setItem(this.auth0IdTokenKeyName, auth0Token);
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
    try {
      await this.serverSignin(data)
      this.signedInOk(data)
    } catch (err) {
      let errArgs = Object.assign(data, {
        err
      })
      this.signedInFailure(data)
    }
  }

  createGraphQLServerAuth() {
    return this._createGraphQLServerAuth(this.config)
  }

  get gqlServerAuth() {
    return this.createGraphQLServerAuth()
  }

  get hasGqlServerAuth() {
    return this._createGraphQLServerAuth
  }

  get shouldDoGraphQLServerSignin() {
    return this.hasGqlServerAuth
  }

  async serverSignin(data) {
    // return if gqlServer not configured
    if (!this.shouldDoGraphQLServerSignin) {
      this.log('skipping GraphQLServer signin')
      return
    }
    if (this.hasGqlServerAuth) {
      // make graphQL connection if not yet established
      // doing it here should make sure that auth signin has been completed and
      // store is populated with authToken needed by graphQL connection transport layer
      this.connection = this.connection || this.createConnection(this.config)

      await this.gqlServerAuth.signin(data)
    } else {
      this.log('Skipping GraphQL Auth. gqlServerAuth instance not found')
    }
  }

  signedInFailure(data) {
    let {
      err,
      profile
    } = data
    this.log('signedInFailure', err)
    this.publish('signedInFailure', data)
    this.handleSigninError(data)
  }

  signedInOk(data) {
    this.log('signedInOk', data)
    this.publish('signedIn', data)
  }

  handleSigninError(err) {
    this.handleError(err)
  }
}

export function createLock(config, opts) {
  return new Lock(config, opts)
}