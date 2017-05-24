import {
  GraphQLConnection
} from '@tecla5/easy-gql-auth'

export class LokkaConnection extends GraphQLConnection {
  constructor(config = {}, opts = {}) {
    super(config, opts)

    this.Lokka = config.Lokka || opts.Lokka
    this.Transport = config.Transport || opts.Transport
    this.createLokka = config.CreateLokka ||
      opts.CreateLokka ||
      this.createLokkaClient

    this.createTransport = config.createTransport ||
      opts.createTransport ||
      this.createLokkaTransport

    if (opts.bind) {
      this.createLokka.bind(this)
      this.createTransport.bind(this)
    }
    this.name = 'LokkaConnection'
  }

  connect() {
    let headers, transport

    if (!this.tokens.auth0IdToken) {
      this.configError('missing auth0IdToken')
    }

    this.headers = headers = {
      'Authorization': `Bearer ${this.tokens.auth0IdToken}`
    }

    let endpoint = this.endpoint
    this.transport = transport = this.createTransport({
      headers,
      endpoint
    })
    this.client = this.createLokka(transport)
    return this
  }

  createLokkaClient(transport) {
    return new this.Lokka({
      transport: transport || this.transport
    })
  }

  createLokkaTransport({
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
  return new LokkaConnection(config, opts).connect()
}