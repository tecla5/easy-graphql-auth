module.exports = class GCAuth0Connector {
  constructor(config = {}) {
    if (typeof config !== 'object') {
      throw Error('config must be an object')
    }

    this.config = config
    this.store = config.store

    if (!this.config.storage) {
      throw Error('missing storage config')
    }
    this.keyNames = this.config.storage

    if (!this.config.graphCool) {
      throw Error('missing graphCool config')
    }
    this.connection = this.config.graphCool.connection
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
        req.options.headers.authorization = this.store.getItem(graphcoolTokenKeyName) || null;
        next();
      }
    }]);

    this.client = new ApolloClient({
      networkInterface
    })
  }
}