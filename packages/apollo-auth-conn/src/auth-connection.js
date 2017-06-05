import {
  GraphQLConnection
} from '@tecla5/gql-conn'

export function createConnection(config, opts, autoConnect = true) {
  let connection = new ApolloAuthConnection(config, opts)
  return autoConnect ? connection.connect(opts) : connection
}

export class ApolloAuthConnection extends GraphQLConnection {
  constructor(config = {}, opts = {}) {
    super(config, opts)
    this.name = 'ApolloAuthConnection'
    this.configure()
  }

  configure() {
    let config = this.config
    let opts = this.opts
    this.log('configure', {
      config,
      opts
    })
    const containers = [config, opts, opts.client]
    this.extractProperties(containers, 'ApolloClient', 'Client', 'createNetworkInterface', 'createClient')
    this.Client = this.Client || this.ApolloClient
    this.validate()

    this.log('extracted', {
      Client: this.Client,
      createNetworkInterface: this.createNetworkInterface
    })
  }

  validate() {
    this.log('validate')
    if (!this.Client) {
      this.configError('missing Client (or ApolloClient) in constructor arguments')
    }
    if (!this.createNetworkInterface) {
      this.configError('missing createNetworkInterface in constructor arguments')
    }
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
    networkInterface = networkInterface || this.networkInterface
    this.log('createApolloClient', {
      Client,
      networkInterface
    })
    return new Client({
      networkInterface
    })
  }
}