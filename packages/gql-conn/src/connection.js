import {
  Configurable
} from '@tecla5/token-foundation'

export class GraphQLConnection extends Configurable {
  constructor(config = {}, opts) {
    super(config, opts)
    let gqlServer = config.gqlServer
    gqlServer.endpoint = gqlServer.endpoint || gqlServer.connection.uri
    this.config.gqlServer = gqlServer
    this.validateConnection()
  }

  validateConnection() {
    if (typeof this.store !== 'object') {
      this.configError('missing store for holding auth token')
    }

    if (typeof this.keyNames !== 'object') {
      this.configError('missing keyNames object, used to indicate names used to store token keys')
    }
  }

  get defaultHeaders() {
    return null
  }

  setJwtToken({
    signinToken
  }) {
    this.log('Setting JWT token on connection', signinToken)
  }

  get authTokenKeyName() {
    return this.keyNames.gqlServerTokenKeyName
  }

  get authIdToken() {
    return this.store.getItem(this.authTokenKeyName) || null
  }
}