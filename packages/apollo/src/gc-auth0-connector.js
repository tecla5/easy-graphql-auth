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

  configure() {
    this.networkInterface = createNetworkInterface(this.connection)
    this.networkInterface.use([{
      applyMiddleware(req, next) {
        if (!req.options.headers) {
          req.options.headers = {}; // Create the header object if needed.
        }
        // get the authentication token from local storage if it exists
        req.options.headers.authorization = localStorage.getItem(this.graphcoolToken) || null;
        next();
      }
    }]);

    this.client = new ApolloClient({
      networkInterface
    })
  }
}