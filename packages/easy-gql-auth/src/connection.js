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
  }
}