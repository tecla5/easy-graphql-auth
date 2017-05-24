import {
  Configurable
} from '@tecla5/token-foundation'

export class GraphQLConnection extends Configurable {
  constructor(config = {}) {
    super(config)
    this.connection = config.gqlServer.connection
  }
}