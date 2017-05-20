import {
  Lokka
} from 'lokka'
import {
  Transport
} from 'lokka-transport-http'

module.exports = class GCAuth0Connector {
  constructor(config = {}) {
    if (typeof config !== 'object') {
      throw Error('config must be an object')
    }

    this.config = config
    this.store = store

    if (!this.config.storage) {
      throw Error('missing storage config')
    }
    this.keyNames = this.config.storage
    this.tokens = this.store ? this.store.getAll() : config.tokens

    if (!this.config.graphCool) {
      throw Error('missing graphCool config')
    }
    this.connection = this.config.graphCool.connection
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