import {
  Configurable
} from './common/configurable'

export class GraphQLConnection extends Configurable {
  constructor(config = {}) {
    super(config)
    this.connection = config.gqlServer.connection
  }
}