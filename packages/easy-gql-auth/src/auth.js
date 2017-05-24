import {
  Configurable
} from '@tecla5/token-foundation'

export class GraphQLAuth extends Configurable {
  constructor(config) {
    super(config)
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
      return this.fakeSigninUser(profile)
    }
    let userData = this.buildSigninUserData(data)
    return await this.queries.signinUser(userData)
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