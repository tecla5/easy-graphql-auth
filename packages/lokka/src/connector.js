import {
  Lokka
} from 'lokka'
import {
  Transport
} from 'lokka-transport-http'

const {
  BaseGCAuth0Connector
} = require('@graphcool/gc-auth0-common')

module.exports = class GCAuth0Connector extends BaseGCAuth0Connector {
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