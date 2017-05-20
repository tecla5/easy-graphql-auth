module.exports = class GCAuth0Connector {
  constructor(config = {}) {
    if (typeof config !== 'object') {
      throw Error('config must be an object')
    }

    this.config = config

    if (!this.config.storage) {
      throw Error('missing localStorage config')
    }
    this.keyNames = this.config.storage

    if (!this.config.graphCool) {
      throw Error('missing graphCool config')
    }
    this.connection = this.config.graphCool.connection
  }

  configure() {}
}