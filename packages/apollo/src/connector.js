const ApolloClient = require('apollo-client')
const {
  createNetworkInterface
} = ApolloClient

const {
  BaseGCAuth0Connector
} = require('@graphcool/gc-auth0-common')

module.exports = class GCAuth0Connector extends BaseGCAuth0Connector {
  constructor(config = {}) {
    super(config)
  }

  configure() {
    let networkInterface = createNetworkInterface(this.connection)
    this.networkInterface = networkInterface
    let graphcoolTokenKeyName = this.keyNames.graphcoolTokenKeyName
    networkInterface.use([{
      applyMiddleware(req, next) {
        if (!req.options.headers) {
          req.options.headers = {}; // Create the header object if needed.
        }
        // get the authentication token from local storage if it exists
        req.options.headers.authorization = this.tokens.graphCoolToken
        next();
      }
    }]);

    this.client = new ApolloClient({
      networkInterface
    })
  }
}