import {
  GraphQLConnection
} from '@tecla5/easy-gql-auth'

export class LokkaAuthConnection extends GraphQLConnection {
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
  return new LokkaAuthConnection(config, opts).connect()
}