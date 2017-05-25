import {
  Configurable
} from '@tecla5/token-foundation'

export class GraphQLConnection extends Configurable {
  constructor(config = {}, opts) {
    super(config, opts)
    let gqlServer = config.gqlServer
    this.gqlServer = gqlServer
    this.connection = gqlServer.connection
    this.connection.endpoint = gqlServer.endpoint || this.connection.uri

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

  get authTokenKeyName() {
    return this.keyNames.auth0IdTokenKeyName
  }

  get authIdToken() {
    return this.store.getItem(this.authTokenKeyName) || null
  }
}