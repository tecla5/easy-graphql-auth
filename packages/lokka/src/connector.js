import {
  Lokka
} from 'lokka'
import {
  Transport
} from 'lokka-transport-http'

import {
  GraphQLConnector
} from '@tecla5/gc-auth0'

export class LokkaConnector extends GraphQLConnector {
  constructor(config = {}) {
    super(config)
  }

  configure() {
    const headers = {
      'Authorization': `Bearer ${this.tokens.auth0IdToken}`
    }

    const transport = new Transport(this.config.graphCool.endpoint, {
      headers
    })
    this.transport = transport

    this.client = new Lokka({
      transport
    })
  }
}