import {
  GraphQLConnection
} from '@tecla5/gql-conn'

export function createConnection(config, opts) {
  return new ApolloAuthConnection(config, opts).connect(opts)
}

export class ApolloAuthConnection extends GraphQLConnection {
  constructor(config = {}, opts = {}) {
    super(config)

    let {
      ApolloClient,
      createNetworkInterface,
    } = opts.clientConfig || {}

    this.ApolloClient = ApolloClient || config.ApolloClient || opts.ApolloClient
    this.createNetworkInterface = createNetworkInterface || config.createNetworkInterface || opts.createNetworkInterface
    this.name = 'ApolloConnection'

    if (!this.ApolloClient) {
      this.configError('missing ApolloClient in constructor arguments')
    }
    if (!this.createNetworkInterface) {
      this.configError('missing createNetworkInterface in constructor arguments')
    }
  }

  connect(opts) {
    let networkInterface = this.createNetworkInterface(this.config.gqlServer.connection)
    this.networkInterface = networkInterface
    this.configureNetworkInterface()
    this.client = this.createApolloClient()
    return this
  }

  async doQuery(query, opts = {}) {
    return await this.client.query({
      query
    })
  }

  configureNetworkInterface() {
    this.networkInterface.use(this.middleWares);
  }

  setJwtToken(signinToken, opts) {
    this.log('Will auto set JWT token on next request header via getItem on store')
  }

  get middleWares() {
    return [this.networkMw]
  }

  get networkMw() {
    return {
      applyMiddleware: (req, next) => {
        // Create the header object if needed.
        if (!req.options.headers) {
          req.options.headers = this.defaultHeaders || {}
        }
        // get the authentication token from local storage if it exists
        req.options.headers.authorization = this.authToken
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