module.exports = class BaseGCAuth0Connector {
  constructor(config = {}) {
    if (typeof config !== 'object') {
      throw Error('config must be an object')
    }

    this.config = config
    this.store = config.store

    if (!config.storage) {
      throw Error('missing storage config')
    }
    this.storage = config.storage
    this.keyNames = config.storage // alias

    if (!config.graphCool) {
      throw Error('missing graphCool config')
    }

    this.auth0 = config.auth0
    this.graphCool = config.graphCool
    this.tokens = this.store ? this.store.getAll() : config.tokens
    this.connection = config.graphCool.connection
  }
}