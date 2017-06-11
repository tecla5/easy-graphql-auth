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
    this.postConfig()
  }

  configure() {
    super.configure()
    if (this.configured.ApolloConn) return
    let config = this.config
    let opts = this.opts
    this.log('configure', {
      config,
      opts
    })
    const containers = [config, opts, opts.client]
    this.log('ApolloAuthConnection: extract')
    this.extractProperties(containers, 'ApolloClient', 'Client', 'createNetworkInterface', 'createClient')
    this.Client = this.Client || this.ApolloClient
    this.log('extracted', {
      Client: this.Client,
      createNetworkInterface: this.createNetworkInterface
    })
    if (opts.bind) {
      this.createClient.bind(this)
      this.createNetworkInterface.bind(this)
    }

    this.configured.ApolloConn = true
    return this
  }

  postConfig() {
    this.validateConfig()
    return this
  }

  validateConfig(force) {
    if (this.validated.ApolloConn && !force) return
    this.validated.ApolloConn = false
    if (!this.Client) {
      this.configError('missing Client (or ApolloClient) in constructor arguments')
    }
    if (!this.createNetworkInterface) {
      this.configError('missing createNetworkInterface in constructor arguments')
    }
    this.validated.ApolloConn = true
    return this
  }

  connect(opts) {
    this.log('connect', {
      opts
    })
    let networkInterface = this.createNetworkInterface(this.config.gqlServer.connection)
    this.networkInterface = networkInterface

    this.configureNetworkInterface()

    let client = this.createClient()
    this.log('connected', {
      networkInterface,
      client
    })
    this.client = client
    return this
  }

  async doQuery(query, opts = {}) {
    query = this.prepareQuery(query, opts = {})
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

        // see getter: authToken() in @tecla5/gql-conn module
        req.options.headers.authorization = this.authToken
        next();
      }
    }
  }

  createClient(networkInterface) {
    let Client = this.Client
    networkInterface = networkInterface || this.networkInterface
    this.log('createClient', {
      Client,
      networkInterface
    })
    return this.client = new Client({
      networkInterface
    })
  }
}
