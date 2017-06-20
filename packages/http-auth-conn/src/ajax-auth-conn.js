import {
  HttpAuthConn
} from './http-conn'

export function createConnection(config, opts) {
  return new AjaxAuthConn(config, opts)
}

export class AjaxAuthConn extends HttpAuthConn {
  constructor(config = {}, opts = {}) {
    super(config, opts)
    this.name = 'AjaxAuthConn'
  }

  configure(force) {
    super.configure(force)
    if (this.configured.AjaxAuthConn && !force) return

    this.client = this.config.client

    this.configured.AjaxAuthConn = true
    return this
  }

  prepareQuery(query, opts = {}) {
    let preparedQuery = Object.assign({}, query, {
      // assumes jQuery Ajax is used
      beforeSend: function (xhr) {
        //Include the bearer token in header
        xhr.setRequestHeader('Authorization', this.bearer);
      }
    })

    return preparedQuery
  }

  async doQuery(query, opts = {}) {
    this.log('doQuery', {
      query,
      opts
    })
    return await this.client.ajax(query)
  }

  setJwtToken(signinToken, opts) {
    this.log('Will auto set JWT token on next request header via getItem on store')
  }

  get defaultHeaders() {
    return null
  }
}
