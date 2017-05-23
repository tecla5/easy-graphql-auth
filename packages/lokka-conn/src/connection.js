import {
  Lokka
} from 'lokka'
import {
  Transport
} from 'lokka-transport-http'

import {
  GraphQLConnection
} from '@tecla5/gql-auth'

export class LokkaConnection extends GraphQLConnection {
  constructor(config = {}) {
    super(config)
  }

  connect() {
    let headers, transport
    this.headers = headers = {
      'Authorization': `Bearer ${this.tokens.auth0IdToken}`
    }
    this.transport = transport = this.createTransport(headers)
    this.client = createClient(transport)
    return this
  }

  createClient(transport) {
    return new Lokka({
      transport: transport || this.transport
    })
  }

  createTransport({
    headers,
    endpoint
  }) {
    endpoint = endpoint || this.config.graphCool.endpoint
    return new Transport(endpoint, {
      headers: headers || this.headers
    })
  }
}

export function createConnection(config) {
  return new LokkaConnection(config).connect()
}