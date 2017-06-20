import {
  Configurable
} from '@tecla5/token-foundation'

export function createConnection(config, opts) {
  return new HttpAuthConn(config, opts)
}

export class HttpAuthConn extends Configurable {
  constructor(config = {}, opts = {}) {
    super(config, opts)
    this.name = 'HttpConnection'
    this.configure()
    this.postConfig()
  }

  configure() {
    super.configure()

    if (this.configured.HttpConnection) return
    let config = this.config

    let httpServer = config.httpServer
    if (!httpServer) {
      this.configError('missing httpServer object in configuration')
    }

    this.log('httpServer config', {
      httpServer
    })
    this.config.httpServer = httpServer || {}
    return this
  }

  prepareQuery(query, opts = {}) {
    this.log('prepareQuery', {
      query,
      opts
    })
    // client could be Fetch API or Ajax etc.
    if (!this.client) {
      this.handleError('prepareQuery: missing client')
    }

    if (!query) {
      this.handleError('prepareQuery: query is not defined', query)
    }

    return query
  }

  async doQuery(query, opts = {}) {
    this.log('doQuery', {
      query,
      opts
    })
    this.handleError('doQuery: must be implemented by subclass')
  }

  postConfig() {
    this.validateConfig()
    this.configured.HttpConnection = true
  }

  validateConfig(force) {
    if (this.validated.HttpConnection && !force) return
    this.validated.HttpConnection = false
    super.validateConfig(force)
    this.validated.HttpConnection = true
  }

  get bearer() {
    return 'Bearer ' + this.authToken
  }

  get authHeader() {
    return {
      'Authorization': this.bearer
    }
  }

  get defaultHeaders() {
    return null
  }

  setJwtToken(signinToken, opts = {}) {
    this.log('setJwtToken not yet implemented on Http server connection :(', {
      signinToken
    })
  }

  get authTokenKeyName() {
    return process.env.server_tokenKeyName || this.keyNames.serverTokenKeyName
  }

  get authToken() {
    return this.store.getItem(this.authTokenKeyName) || null
  }
}
