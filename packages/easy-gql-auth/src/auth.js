import {
  GraphQLConnection
} from './connection'

export class GraphQLAuth extends GraphQLConnection {
  constructor(config = {}, opts = {}) {
    super(config, opts)
    this.connection = this.connection || config.connection
    if (opts.createConnection) {
      this.connection = opts.createConnection(config, opts)
    }
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
    // set graphcool token in localstorage
    this.store.setItem(this.gqlServerTokenKeyName, signinToken)
    return this
  }

  async signin(data) {
    let {
      auth0Token,
      profile
    } = data
    this.log('Signing into GraphQL server');
    let created = await this.doCreateUser(data)
    const signinResult = await this.doSigninUser(data)
    const signinToken = this.extractSignedInUserToken(signinResult)
    this.setGraphQLServerToken(signinToken)
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
      auth0Token,
      profile
    } = data
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
        let result = await this.doQuery({
          query: this.queries.createUser(userData)
        })
        publish('createdUserOK', {
          auth0Token,
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
      publish('createUserFailure', {
        auth0Token,
        userData,
        profile,
        result,
        error
      })
      this.handleQueryError(err)
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
      return this.fakeSigninUser(profile)
    }
    let userData = this.buildSigninUserData(data)
    try {
      let result = await this.doQuery({
        query: this.queries.signinUser(userData)
      })
      this.publish('signedInOK', {
        auth0Token,
        profile,
        userData,
        result
      })
      return result
    } catch (error) {
      this.publish('signedInFailure', {
        auth0Token,
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

export function createGraphQLAuth(config) {
  return new GraphQLAuth(config)
}