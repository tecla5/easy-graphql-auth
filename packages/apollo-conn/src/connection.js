import {
  GraphQLConnection
} from '@tecla5/easy-gql-auth'

export class ApolloConnection extends GraphQLConnection {
  constructor(config = {}, opts = {}) {
    super(config)
    this.ApolloClient = config.ApolloClient || opts.ApolloClient

    if (!this.ApolloClient) {
      this.configError('missing ApolloClient in constructor arguments')
    }
    if (!this.ApolloClient.createNetworkInterface) {
      this.configError('missing createNetworkInterface method in supplied ApolloClient')
    }

    this.createNetworkInterface = this.ApolloClient.createNetworkInterface
  }

  configError(msg) {
    console.error('ApolloConnection', msg)
    throw Error(msg)
  }

  connect() {
    let networkInterface = this.createNetworkInterface(this.connection)
    this.networkInterface = networkInterface
    let graphcoolTokenKeyName = this.keyNames.gqlServerTokenKeyName
    this.configureNetworkInterface()
    this.client = this.createApolloClient()
    return this
  }

  configureNetworkInterface() {
    this.networkInterface.use([this.networkMw()]);
  }

  networkMw() {
    return {
      applyMiddleware: (req, next) => {
        if (!req.options.headers) {
          req.options.headers = {}; // Create the header object if needed.
        }
        // get the authentication token from local storage if it exists
        req.options.headers.authorization = this.tokens.gqlServerToken
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

export function createConnection(config) {
  return new ApolloConnection(config).connect()
}