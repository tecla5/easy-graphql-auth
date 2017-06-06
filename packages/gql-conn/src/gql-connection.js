import {
  Configurable
} from '@tecla5/token-foundation'

export class GraphQLConnection extends Configurable {
  constructor(config = {}, opts = {}) {
    super(config, opts)
    this.name = 'GraphQLConnection'
    this.configure()
    this.postConfig()
  }

  configure() {
    super.configure()

    if (this.configured.GraphQLConnection) return
    let config = this.config

    let gqlServer = config.gqlServer
    gqlServer.endpoint = gqlServer.endpoint || gqlServer.connection.uri

    this.config.gqlServer = gqlServer
    this.configured.GraphQLConnection = true
    return this
  }

  postConfig() {
    this.validateConfig()
  }

  validateConfig() {
    super.validateConfig()
    if (this.validated.GraphQLConnection) return
    if (typeof this.store !== 'object') {
      this.configError('missing store for holding signinToken from GraphQL server')
    }

    if (typeof this.keyNames !== 'object') {
      this.configError('missing keyNames object, used to indicate store token keys')
    }
    this.validated.GraphQLConnection = true
  }

  get defaultHeaders() {
    return null
  }

  setJwtToken(signinToken, opts = {}) {
    this.log('setJwtToken not yet implemented on GraphQL server Connection :(', {
      signinToken
    })
  }

  get authTokenKeyName() {
    return this.keyNames.gqlServerTokenKeyName
  }

  get authToken() {
    return this.store.getItem(this.authTokenKeyName) || null
  }
}