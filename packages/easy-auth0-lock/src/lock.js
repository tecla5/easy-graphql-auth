import {
  Configurable,
} from '@tecla5/token-foundation'

import extend from 'deep-extend'

function isObj(val) {
  return typeof val === 'object' && val !== null
}

const errorCode = {
  USER_ALREADY_EXISTS: 3023
}

export function createLock(config, opts) {
  return new Lock(config, opts)
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

  // config = {
  //   title,
  //   logo,
  //   theme,
  //   dict,
  //   keyNames,
  //   queries,
  //   store,
  //   storage,
  //   gqlServer,
  //   client,
  //   connection,
  //   lock,
  //   createLockUi,
  //   createGraphQLServerAuth,
  //   displayMethod
  // }
  constructor(config = {}, opts = {}) {
    super(config, opts)
    this.configure()
    this.postConfig()
    this.onHashParsed()
  }

  configure(force) {
    if (this.configured.Lock && !force) return
    super.configure()
    let config = this.config
    let opts = this.opts

    const containers = [config, opts, opts.lock]
    this.extractProperties(containers, 'Auth0Lock', 'createLockUi')

    this.displayMethod = this.config.displayMethod || this.defaultDisplayMethod

    let {
      theme,
      logo,
      dict,
      title
    } = this.extractProps(false, containers, 'theme', 'logo', 'title', 'dict')

    this.lockConfig = config.lock || opts.lock || {}

    dict = dict || {}
    theme = theme || {}

    dict.title = title || dict.title || this.defaultTitle
    theme.dict = dict || {}
    theme.logo = logo || theme.logo

    this.dict = dict || {}
    this.theme = theme || {}

    this.setupLockConfig()

    this.auth0Config = this.extractAuth0config(config)

    this.configured.Lock = true
    return this
  }

  get defaultTitle() {
    return 'Sign in'
  }

  createLock() {
    if (!this.auth0Config) {
      this.configError('missing Auth0 configuration')
    }
    this.lock = this.createLockUi(this.auth0Config, this.opts) //.bind(this)
  }

  postConfig() {
    this.validateConfig()
    this.createLock()
    return this
  }

  get defaultDisplayMethod() {
    return 'getUserInfo'
  }

  validateConfig(force) {
    if (this.validated.Lock && !force) return
    super.validateConfig(force)

    if (!this.auth0Config) {
      this.configError('missing auth0Config')
    }
    if (!this.Auth0Lock) {
      this.configError('missing Auth0Lock')
    }
    if (!this.createLockUi) {
      this.configError('missing createLockUi')
    }
    this.validated.Lock = true
    return this
  }

  extractAuth0config(config) {
    config = config || this.config
    if (isObj(config.auth)) {
      return config.auth.auth0 || config.auth || {}
    }
    return config.auth0 || {}
  }

  setupLockConfig() {
    this.lockConfig = extend(this.defaultLockConfig, this.lockConfig)
    return this
  }

  get defaultTheme() {
    return {}
  }

  get defaultLockConfig() {
    return {
      theme: this.defaultTheme || {}
    }, {
      languageDictionary: this.dict || {}
    }
  }

  createLockUi(authConfig = {}, opts) {
    this.log('create lock', authConfig, opts)
    return new this.Auth0Lock(authConfig.clientId, authConfig.domain, opts)
  }

  get authTokenKeyName() {
    let name = this.store.authTokenKeyName
    if (!name) {
      this.handleError('store missing authTokenKeyName', this.store)
    }
    return name
  }

  get auth0Token() {
    return this.store.getItem(this.authTokenKeyName)
  }

  set auth0Token(auth0Token) {
    this.store.setItem(this.authTokenKeyName, auth0Token);
    return this
  }

  onHashParsed() {
    if (this.hashWasParsed) return
    this.lock.on('hash_parsed', (authResult) => {
      this.hashWasParsed = true
      this.log('hash parsed', {
        authResult
      });
      if (authResult == null) {
        if (this.auth0Token == null) {
          this.showLock();
        }
      } else {
        this.log('setting auth token', {
          authResult
        });
        if (authResult.idToken) {
          this.auth0Token = authResult.idToken
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
    this.resetStore()
    this.loggedOut()
    return this
  }

  loggedOut() {
    this.log('logged out');
    this.notifySuccess('logout', true)
    return this
  }

  resetTokens() {
    this.log('resetTokens')
    this.tokens = {
      auth0Token: null
    }
    this.notifySuccess('tokens:reset', true)
    return this
  }

  resetStore() {
    this.log('resetStorage');
    this.store.resetAll()
    this.notifySuccess('store:reset', true)
    return this
  }

  // display lock popup
  showLock(config = {}) {
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

  async serverSignin(data) {
    this.log('serverSignin', data)
  }

  signedInFailure(data) {
    let {
      err,
      profile
    } = data
    this.log('signedInFailure', err)
    this.handleSigninError(data)
  }

  signedInOk(data) {
    this.log('signedInOk', data)
    this.notifySuccess('signin', data)
  }

  handleSigninError(err) {
    this.notifyFailure('signin', err)
    // this.handleError(err)
  }
}
