import {
  Configurable
} from '@tecla5/token-foundation'

export function createConnection(config, opts) {
  return new GraphQLConnection(config, opts)
}

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
    if (!gqlServer) {
      this.configError('missing gqlServer object in configuration')
    }

    this.log('gqlServer config', {
      gqlServer
    })
    gqlServer.endpoint = gqlServer.endpoint || gqlServer.connection.uri

    this.config.gqlServer = gqlServer || {}
    return this
  }

  postConfig() {
    this.validateConfig()
    this.configured.GraphQLConnection = true
  }

  validateConfig(force) {
    if (this.validated.GraphQLConnection && !force) return
    this.validated.GraphQLConnection = false
    super.validateConfig(force)
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
