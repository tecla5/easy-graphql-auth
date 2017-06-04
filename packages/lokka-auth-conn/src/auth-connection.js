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
  }

  configure() {
    let config = this.config
    let opts = this.opts
    this.log('configure', {
      config,
      opts
    })

    const containers = [config, opts, opts.client]
    this.extractProperties(containers, 'Client', 'Transport', 'createClient', 'createTransport')
    this.Client = this.Client || this.Lokka

    if (opts.bind) {
      this.createClient.bind(this)
      this.createTransport.bind(this)
    }
    this.validateConfig()

    this.log('extracted', {
      Client: this.Client,
      Transport: this.Transport,
      createClient: this.createClient,
      createTransport: this.createTransport
    })
  }

  validateConfig() {
    this.log('validate')
    if (!this.Client) {
      this.configError('missing ApolloClient in constructor arguments')
    }
    if (!this.createNetworkInterface) {
      this.configError('missing createNetworkInterface in constructor arguments')
    }
  }

  async doQuery(query, opts = {}) {
    this.log('doQuery', {
      query,
      opts
    })
    if (!this.client) {
      this.error('doQuery: missing client')
    }
    return await this.client.query(query)
  }

  headers(token = null) {
    let authToken = this.authToken || token
    return authToken ? createAuthHeader(authToken) : this.defaultHeaders
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
    this.transport = transport
    this.client = this.createClient(transport)
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
    return new Client({
      transport
    })
  }

  createTransport({
    headers,
    endpoint
  }) {
    endpoint = endpoint || this.endpoint
    headers = headers || this.headers
    if (!endpoint) {
      this.configError('missing endpoint')
    }
    if (!headers) {
      this.configError('missing headers')
    }

    return new this.Transport(endpoint, {
      headers
    })
  }
}