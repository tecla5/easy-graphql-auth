import {
  GraphQLConnection
} from '@tecla5/gql-conn'

export function createConnection(config, opts, autoConnect = true) {
  let connection = new LokkaAuthConnection(config, opts)
  return autoConnect ? connection.connect(opts) : connection
}

export class LokkaAuthConnection extends GraphQLConnection {
  constructor(config = {}, opts = {}) {
    super(config, opts)
    this.name = 'LokkaAuthConnection'
    this.configure()
    this.postConfig()
  }

  configure(force) {
    if (this.configured.LokkaConn && !force) return
    super.configure()
    let config = this.config
    let opts = this.opts
    this.log('configure', {
      config,
      opts
    })

    const containers = [config, opts, opts.client]
    this.extractProperties(containers, 'Lokka', 'Client', 'Transport', 'createClient', 'createTransport')
    this.Client = this.Client || this.Lokka

    // if (!this.config.gqlServer) {
    //   this.configError('missing gqlServer object in configuration')
    // }
    // note: gqlServer.endpoint will be configured by GraphQLConnection
    this.endpoint = this.config.gqlServer.endpoint

    if (opts.bind) {
      this.createClient.bind(this)
      this.createTransport.bind(this)
    }

    this.log('extracted', {
      Client: this.Client,
      Transport: this.Transport,
      createClient: this.createClient,
      createTransport: this.createTransport
    })
    this.configured.ApolloConn = true
    return this
  }

  postConfig() {
    this.validateConfig()
    return this
  }

  validateConfig(force = false) {
    if (this.validated.ApolloConn && !force) return
    this.validated.ApolloConn = false

    if (!this.Client) {
      this.configError('missing Client/Lokka')
    }
    if (!this.createTransport) {
      this.configError('missing createTransport')
    }

    if (!this.endpoint) {
      this.configError('missing endpoint')
    }

    this.validated.ApolloConn = true
  }

  async doQuery(query, opts = {}) {
    query = this.prepareQuery(query, opts = {})
    return await this.client.query(query)
  }

  headers(token = null) {
    let authToken = this.authToken || token
    return authToken ? this.createAuthHeader(authToken) : this.defaultHeaders
  }

  createAuthHeader(authToken) {
    return {
      'Authorization': `Bearer ${authToken}`
    }
  }

  connect(token) {
    let endpoint = this.endpoint
    let headers = this.headers(token) || {}

    let transport = this.createTransport({
      headers,
      endpoint
    })
    this.createClient(transport)
    return this
  }

  setJwtToken(token, opts = {}) {
    return this.connect(token)
  }

  createClient(transport) {
    let Client = this.Client
    transport = transport || this.transport
    this.log('createApolloClient', {
      Client,
      transport
    })
    return this.client = new Client({
      transport
    })

  }

  createTransport(opts = {}) {
    let {
      headers,
      endpoint
    } = opts

    this.log('createTransport', opts)
    endpoint = endpoint || this.endpoint
    headers = headers || this.headers
    if (!endpoint) {
      this.configError('missing endpoint')
    }
    if (!headers) {
      this.configError('missing headers')
    }

    return this.transport = new this.Transport(endpoint, {
      headers
    })
  }
}
