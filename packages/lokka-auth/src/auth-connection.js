import {
  GraphQLConnection
} from '@tecla5/easy-gql-auth'

export class LokkaAuthConnection extends GraphQLConnection {
  constructor(config = {}, opts = {}) {
    super(config, opts)

    this.Lokka = config.Lokka || opts.Lokka
    this.Transport = config.Transport || opts.Transport
    this.createClient = config.createClient ||
      opts.createClient ||
      this.createClient

    this.createTransport = config.createTransport ||
      opts.createTransport ||
      this.createTransport

    if (opts.bind) {
      this.createClient.bind(this)
      this.createTransport.bind(this)
    }
    this.name = 'LokkaAuthConnection'
  }

  async doQuery(query, opts) {
    return await this.client.query(query)
  }

  connect() {
    let headers, transport
    let auth0IdToken = this.tokens.auth0IdToken

    if (!auth0IdToken) {
      this.configError('missing auth0IdToken for HTTP header')
    }

    this.headers = headers = {
      'Authorization': `Bearer ${auth0IdToken}`
    }

    let endpoint = this.endpoint
    this.transport = transport = this.createTransport({
      headers,
      endpoint
    })
    this.client = this.createClient(transport)
    return this
  }

  createClient(transport) {
    return new this.Lokka({
      transport: transport || this.transport
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

export function createConnection(config, opts) {
  return new LokkaAuthConnection(config, opts).connect()
}