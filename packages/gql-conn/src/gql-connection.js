import {
  Configurable
} from '@tecla5/token-foundation'

export function createConnection(config, opts) {
  return new GraphQLConnection(config, opts)
}

export class GraphQLConnection extends Configurable {
  constructor(config = {}, opts = {}) {
    super(config, opts)
    this.name = 'GraphQLConnection'
    this.configure()
    this.postConfig()
  }

  configure() {
    super.configure()

    if (this.configured.GraphQLConnection) return
    let config = this.config

    let gqlServer = config.gqlServer
    if (!gqlServer) {
      this.configError('missing gqlServer object in configuration')
    }

    this.log('gqlServer config', {
      gqlServer
    })
    gqlServer.endpoint = process.env.gqlServer_endpoint || gqlServer.endpoint || gqlServer.connection.uri

    this.config.gqlServer = gqlServer || {}
    return this
  }

  prepareQuery(query, opts = {}) {
    this.log('doQuery', {
      query,
      opts
    })
    if (!this.client) {
      this.handleError('doQuery: missing client')
    }

    if (!query) {
      this.handleError('doQuery: query is not defined', query)
    }

    if (this.isGqlQuery(query)) {
      query = this.toGqlQuery(query)
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

  isGqlQuery(query) {
    if (typeof query !== 'object') return false
    // see: https://www.npmjs.com/package/graphql-tag
    if (query.kind === 'Document') return true
    return false
  }

  toGqlQuery(queryStr, opts) {
    if (typeof query !== 'string') {
      this.handleError('toGqlQuery: bad query', queryStr)
    }
    if (typeof this.gql !== 'function') {
      this.log('Try: https://www.npmjs.com/package/graphql-tag')
      this.error('Also see: https://www.npmjs.com/package/graphql')
      this.handleError('missing gql function to convert query string to GraphQL query')
    }
    return this.gql(query, opts)
  }

  postConfig() {
    this.validateConfig()
    this.configured.GraphQLConnection = true
  }

  validateConfig(force) {
    if (this.validated.GraphQLConnection && !force) return
    this.validated.GraphQLConnection = false
    super.validateConfig(force)
    this.validated.GraphQLConnection = true
  }

  get defaultHeaders() {
    return null
  }

  setJwtToken(signinToken, opts = {}) {
    this.log('setJwtToken not yet implemented on GraphQL server Connection :(', {
      signinToken
    })
  }

  get authTokenKeyName() {
    return process.env.gqlServer_tokenKeyName || this.keyNames.gqlServerTokenKeyName
  }

  get authToken() {
    return this.store.getItem(this.authTokenKeyName) || null
  }
}
