import {
  Configurable
} from '@tecla5/token-foundation'


export function createHttpAuth(config, opts) {
  return new HttpAuth(config, opts)
}

export class HttpAuth extends Configurable {
  constructor(config = {}, opts = {}) {
    super(config, opts)
    this.name = 'HttpAuth'
    this.configure()
    this.postConfig()
  }

  configure(force) {
    if (this.configured.HttpAuth && !force) return
    super.configure()
    let config = this.config
    let opts = this.opts

    const containers = [config, opts, opts.client]
    this.extractProperties(containers, 'createConnection', 'connection')

    if (!this.connection && !this.createConnection) {
      this.configError('Missing connection or createConnection option')
    }

    this.connection = this.connection || this.createConnection(config, opts)
    this.configured.HttpAuth = true
    return this
  }

  postConfig() {
    super.postConfig()
    this.validateConfig()
  }

  validateConfig(force) {
    super.validateConfig()
    if (this.validated.HttpAuth && !force) return
    if (!this.connection) {
      this.configError('missing Feathers connection in configuration')
    }
    this.validated.HttpAuth = true
  }

  extractSignedInUserToken(signinResult) {
    return signinResult.data.signinUser.token
  }

  get serverTokenKeyName() {
    return this.store.gqlServerTokenKeyName
  }

  setServerToken(signinToken) {
    if (!this.store) {
      this.handleError('Missing store for setting signinToken', {
        signinToken
      })
    }
    // set graphcool token in localstorage
    this.store.setItem(this.serverTokenKeyName, signinToken)
    this.notifySuccess('token:stored', {
      signinToken
    })
    return this
  }

  async signin(data) {
    let {
      authToken,
      profile
    } = data
    this.log('Signing into Feathers server');
    let created = await this.doCreateUser(data)
    const signinResult = await this.doSigninUser(data)
    const signinToken = this.extractSignedInUserToken(signinResult)
    this.handleReceivedServerToken(signinToken)
    return {
      status: signinResult,
      token: signinToken,
    }
  }

  handleReceivedServerToken(signinToken) {
    this.notifySuccess('token:received', {
      signinToken
    })
    this.setServerToken(signinToken)
    this.setJwtToken(signinToken)
  }

  setJwtToken(signinToken) {
    if (!this.connection) {
      this.error('missing connection for setting JWT token')
    }
    this.connection.setJwtToken(signinToken, this.opts)
    this.notifySuccess('jwt:token', {
      signinToken
    })
  }

  handleQueryError(err) {
    this.handleError(err)
  }

  buildUserData(data) {
    let {
      authToken,
      profile
    } = data
    return {
      authToken: authToken,
      name: profile.name
    }
  }

  // TODO: make more clean
  async doCreateUser(data) {
    let {
      authToken,
      profile
    } = data
    // create user if necessary
    let result
    let userData
    try {
      userData = this.buildUserData(data)
      this.log('Create user', data);

      this.validateQueries()

      if (this.queries && this.queries.createUser) {
        let query = this.queries.createUser(userData)
        let result = await this.doQuery(query)
        this.notifySuccess('user:create', {
          authToken,
          userData,
          profile,
          result
        })
        return result
      } else {
        this.log('missing createUser query, faking it')
        return await this.fakeCreateUser(userData)
      }
    } catch (error) {
      this.notifyFailure('user:create', {
        authToken,
        userData,
        profile,
        result,
        error
      })
      this.handleQueryError(err)
    }
  }

  validateQueries() {
    if (typeof this.queries !== 'object') {
      this.warn('No queries object defined', {
        queries: this.queries
      })
    }
  }

  async doQuery(query, opts = {}) {
    return await this.connection.doQuery(
      query, opts)
  }

  // TODO: simulate GraphCool query mutation result?
  fakeCreateUser(userData) {
    return userData
  }

  buildSigninUserData({
    authToken,
    profile
  }) {
    return {
      authToken: authToken
    }
  }

  // sign in user
  async doSigninUser(data) {
    let {
      authToken,
      profile
    } = data
    this.log('signin user', data);
    this.validateQueries()

    if (!(this.queries && this.queries.signinUser)) {
      return this.fakeSigninUser(profile)
    }
    let userData = this.buildSigninUserData(data)
    try {
      let query = this.queries.signinUser(userData)
      let result = await this.doQuery(query)
      this.notifySuccess('server:signin', {
        authToken,
        profile,
        userData,
        result
      })
      return result
    } catch (error) {
      this.notifyFailure('server:signin', {
        authToken,
        profile,
        userData,
        error,
      })
      this.handleQueryError(error)
    }
  }

  fakeSigninUser(profile) {
    this.log('returning fake signedinUser')
    return {
      signinUser: {
        token: '1234'
      }
    }
  }
}
