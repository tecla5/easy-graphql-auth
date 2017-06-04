import {
  GraphQLConnection
} from '@tecla5/gql-conn'

export function createConnection(config, opts) {
  return new ApolloAuthConnection(config, opts).connect(opts)
}

export class ApolloAuthConnection extends GraphQLConnection {
  constructor(config = {}, opts = {}) {
    super(config, opts)
    this.log('constructor', {
      config,
      opts
    })
    const containers = [config, opts, opts.client]
    this.extractProperties(containers, 'ApolloClient', 'Client', 'createNetworkInterface', 'createClient')
    this.Client = this.Client || this.ApolloClient
    this.validate()

    this.log('extracted', {
      ApolloClient,
      createNetworkInterface
    })
  }

  validate() {
    this.log('validate')
    if (!this.Client) {
      this.configError('missing ApolloClient in constructor arguments')
    }
    if (!this.createNetworkInterface) {
      this.configError('missing createNetworkInterface in constructor arguments')
    }
  }

  get name() {
    return 'ApolloAuthConnection'
  }

  connect(opts) {
    this.log('connect', {
      opts
    })
    let networkInterface = this.createNetworkInterface(this.config.gqlServer.connection)
    this.configureNetworkInterface()

    let client = this.createApolloClient()
    this.log('connected', {
      networkInterface,
      client
    })
    this.networkInterface = networkInterface
    this.client = client
    return this
  }

  async doQuery(query, opts = {}) {
    this.log('doQuery', {
      query,
      opts
    })
    if (!this.client) {
      this.error('doQuery: missing client')
    }
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

  createApolloClient(networkInterface) {
    let Client = this.Client
    let networkInterface = networkInterface || this.networkInterface
    this.log('createApolloClient', {
      Client,
      networkInterface
    })
    return new Client({
      networkInterface
    })
  }
}