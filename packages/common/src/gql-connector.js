import {
  Configurable
} from './common/configurable'

export class GraphQLConnector extends Configurable {
  constructor(config = {}) {
    super(config)
    this.connection = config.gqlServer.connection
  }
}