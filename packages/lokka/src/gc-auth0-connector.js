module.exports = class GCAuth0Connector {
  constructor(config = {}) {
    if (typeof config !== 'object') {
      throw Error('config must be an object')
    }

    this.config = config

    if (!this.config.localStorage) {
      throw Error('missing localStorage config')
    }
    this.graphcoolToken = this.config.localStorage.graphcoolToken

    if (!this.config.graphCool) {
      throw Error('missing graphCool config')
    }
    this.connection = this.config.graphCool.connection
  }

  configure() {}
}