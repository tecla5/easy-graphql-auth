export class BaseGCAuth0Connector {
  constructor(config = {}) {
    this.validate(config)
    this.config = config
    this.store = config.store
    this.storage = config.storage
    this.keyNames = config.storage // alias
    this.auth0 = config.auth0
    this.gc = config.gc
    this.tokens = this.store ? this.store.getAll() : config.tokens
    this.connection = config.gc.connection
  }

  validate() {
    if (!config.storage) {
      throw Error('missing storage config')
    }
    if (!config.gc) {
      throw Error('missing gc config')
    }
    if (typeof config !== 'object') {
      throw Error('config must be an object')
    }
  }
}