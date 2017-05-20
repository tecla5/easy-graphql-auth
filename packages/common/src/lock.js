const Auth0Lock = require('auth0-lock')

const defaultKeyNames = {
  auth0TokenStorageKey: 'auth0Token',
  graphCoolTokenStorageKey: 'graphCoolToken'
}

const defaultQueries = require('./queries')
const Store = require('./store')

const USER_ALREADY_EXISTS_ERROR_CODE = 3023

module.exports = class Lock {

  // storage: { // localstorage
  //   auth0IdToken: 'xxx', // key to store auth0IdToken
  //   graphcoolToken: 'xxx' // key to store graphcoolToken
  // },
  // auth0: { // from auth0 client app settings
  //   domain: 'xxx', // Your auth0 domain
  //   clientId: 'xxx' // // Your auth0 client id
  // }
  constructor({
    auth0,
    keyNames,
    queries,
    storage
  }, opts = {}) {
    this.queries = queries || defaultQueries
    this.lock = new Auth0Lock(auth0.clientId, auth0.domain)
    this.keyNames = keyNames || defaultKeyNames
    this.logging = opts.logging
    this.store = new Store(this.keyNames, opts)
    this.tokens = this.store.getAll()
    this.io = opts.io || console
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


  logout() {
    this.log('Logging out');
    this.resetTokens()
    this.resetStorage()
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

  showLogin() {
    this.log('showLogin');
    this.lock.show()
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

  subscribeAuthenticated() {
    this.log('config');
    this.lock.on('authenticated', this.onAuthenticated)
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
    this.log('logged in', {
      auth0Token,
      profile
    })
    let name = profile.name
    this.storeAuth0Token(auth0Token)
    // once authenticated, signin to graphcool
    await this.signinGraphcool({
      auth0Token,
      profile
    })
  }

  async signinGraphcool({
    auth0Token,
    profile
  }) {
    let name = profile.name
    try {
      this.log('Signing into Graphcool');
      await this.doCreateUser({
        auth0Token,
        profile
      })
      const signinResult = await this.doSigninUser({
        auth0Token,
        profile
      })
      const signinToken = signinResult.data.signinUser.token
      this.storeGraphCoolToken(signinToken)
    } catch (err) {
      this.handleSigninError(err)
    }
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
      err.graphQLErrors[0].code !== USER_ALREADY_EXISTS_ERROR_CODE
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