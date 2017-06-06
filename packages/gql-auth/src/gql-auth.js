import {
  GraphQLConnection
} from '@tecla5/gql-conn'

export function createGraphQLAuth(config, opts) {
  return new GraphQLAuth(config, opts)
}

export class GraphQLAuth extends GraphQLConnection {
  constructor(config = {}, opts = {}) {
    super(config, opts)
    this.name = 'GraphQLAuth'
    this.configure()
  }

  configure() {
    let config = this.config
    let opts = this.opts

    const containers = [config, opts, opts.client]
    this.extractProperties(containers, 'createConnection', 'connection')

    if (!this.connection && !this.createConnection) {
      this.configError('Missing connection or createConnection option')
    }

    this.connection = this.connection || this.createConnection(config, opts)
    this.validateConfig()
  }

  validateConfig() {
    if (!this.connection) {
      this.configError('missing GraphQL connection in configuration')
    }
  }

  extractSignedInUserToken(signinResult) {
    return signinResult.data.signinUser.token
  }

  get gqlServerTokenKeyName() {
    return this.store.gqlServerTokenKeyName
  }

  setGraphQLServerToken(signinToken) {
    if (!this.store) {
      this.handleError('Missing store for setting signinToken', {
        signinToken
      })
    }
    // set graphcool token in localstorage
    this.store.setItem(this.gqlServerTokenKeyName, signinToken)
    this.publish('storedGraphQLServerToken', {
      signinToken
    })
    return this
  }

  async signin(data) {
    let {
      authToken,
      profile
    } = data
    this.log('Signing into GraphQL server');
    let created = await this.doCreateUser(data)
    const signinResult = await this.doSigninUser(data)
    const signinToken = this.extractSignedInUserToken(signinResult)
    this.handleReceivedGraphQLServerToken(signinToken)
    return {
      status: signinResult,
      token: signinToken,
    }
  }

  handleReceivedGraphQLServerToken(signinToken) {
    this.publish('receivedGraphQLServerToken', {
      signinToken
    })
    this.setGraphQLServerToken(signinToken)
    this.setJwtToken(signinToken)
  }

  setJwtToken(signinToken) {
    if (!this.connection) {
      this.error('missing connection for setting JWT token')
    }
    this.connection.setJwtToken(signinToken, this.opts)
    this.publish('setJwtToken', {
      signinToken
    })
  }

  handleQueryError(err) {
    if (!err.graphQLErrors ||
      err.graphQLErrors[0].code !== errorCode.USER_ALREADY_EXISTS
    ) {
      this.handleError(err)
    }
  }

  buildUserData(data) {
    let {
      authToken,
      profile
    } = data
    return {
      variables: {
        authToken: authToken,
        name: profile.name
      }
    }
  }

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
        let result = await this.doQuery({
          query: this.queries.createUser(userData)
        })
        this.publish('createdUserOK', {
          authToken,
          userData,
          profile,
          result
        })
        return result
      } else {
        this.log('missing createUser query, faking it')
        await this.fakeCreateUser(userData)
      }
    } catch (error) {
      this.publish('createUserFailure', {
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

  async doQuery({
    query
  }) {
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
      variables: {
        authToken: authToken
      }
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
      let result = await this.doQuery({
        query: this.queries.signinUser(userData)
      })
      this.publish('signedInOK', {
        authToken,
        profile,
        userData,
        result
      })
      return result
    } catch (error) {
      this.publish('signedInFailure', {
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
      data: {
        signinUser: {
          token: '1234'
        }
      }
    }
  }
}