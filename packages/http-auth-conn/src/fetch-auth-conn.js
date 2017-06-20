import {
  HttpAuthConn
} from './http-conn'

export function createConnection(config, opts) {
  return new FetchAuthConn(config, opts)
}

export class FetchAuthConn extends HttpAuthConn {
  constructor(config = {}, opts = {}) {
    super(config, opts)
    this.name = 'FetchAuthConn'
  }

  configure(force) {
    super.configure(force)
    if (this.configured.FetchAuthConn && !force) return

    this.client = this.config.client

    this.configured.FetchAuthConn = true
    return this
  }

  prepareQuery(query, opts = {}) {
    let preparedQuery = Object.assign({}, query, {
      // assumes jQuery Ajax is used
      headers: this.client.headers(this.authHeader, opts)
    })
    return preparedQuery
  }

  async doQuery(query, opts = {}) {
    this.log('doQuery', {
      query,
      opts
    })
    return await this.client.fetch(query)
  }

  setJwtToken(signinToken, opts) {
    this.log('Will auto set JWT token on next request header via getItem on store')
  }

  get defaultHeaders() {
    return null
  }
}
