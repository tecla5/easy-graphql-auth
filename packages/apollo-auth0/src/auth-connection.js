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

  configureNetworkInterface() {
    this.networkInterface.use([this.networkMw()]);
  }

  networkMw() {
    let auth0IdToken = this.tokens.auth0IdToken
    if (!auth0IdToken) {
      this.configError('missing auth0IdToken for HTTP header')
    }

    return {
      applyMiddleware: (req, next) => {
        if (!req.options.headers) {
          req.options.headers = {}; // Create the header object if needed.
        }
        // get the authentication token from local storage if it exists
        req.options.headers.authorization = auth0IdToken
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