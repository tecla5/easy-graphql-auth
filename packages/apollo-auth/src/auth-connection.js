import {
  GraphQLConnection
} from '@tecla5/easy-gql-auth'

export class ApolloAuthConnection extends GraphQLConnection {
  constructor(config = {}, opts = {}) {
    super(config)
    this.ApolloClient = config.ApolloClient || opts.ApolloClient
    this.createNetworkInterface = config.createNetworkInterface || opts.createNetworkInterface
    this.name = 'ApolloConnection'

    if (!this.ApolloClient) {
      this.configError('missing ApolloClient in constructor arguments')
    }
    if (!this.createNetworkInterface) {
      this.configError('missing createNetworkInterface in constructor arguments')
    }
  }

  connect() {
    let networkInterface = this.createNetworkInterface(this.connection)
    this.networkInterface = networkInterface
    this.configureNetworkInterface()
    this.client = this.createApolloClient()
    return this
  }

  async doQuery(query, opts) {
    return await this.client.query({
      query
    })
  }

  configureNetworkInterface() {
    this.networkInterface.use([this.networkMw()]);
  }

  networkMw() {
    return {
      applyMiddleware: (req, next) => {
        // Create the header object if needed.
        if (!req.options.headers) {
          req.options.headers = {};
        }
        // get the authentication token from local storage if it exists
        req.options.headers.authorization = this.authIdToken
        next();
      }
    }
  }

  createApolloClient() {
    return new this.ApolloClient({
      networkInterface: this.networkInterface
    })
  }
}

export function createConnection(config, opts) {
  return new ApolloConnection(config, opts).connect()
}