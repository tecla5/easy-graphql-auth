import {
  GraphQLConnection
} from '@tecla5/easy-gql-auth'

export class LokkaConnection extends GraphQLConnection {
  constructor(config = {}, opts = {}) {
    super(config)

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
  }

  connect() {
    let headers, transport
    this.headers = headers = {
      'Authorization': `Bearer ${this.tokens.auth0IdToken}`
    }
    this.transport = transport = this.createTransport(headers)
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
    endpoint = endpoint || this.config.graphCool.endpoint
    return new this.Transport(endpoint, {
      headers: headers || this.headers
    })
  }
}

export function createConnection(config) {
  return new LokkaConnection(config).connect()
}