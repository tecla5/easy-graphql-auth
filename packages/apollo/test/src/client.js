const ApolloClient, {
  createNetworkInterface
} = require('apollo-client')

const networkInterface = createNetworkInterface({
  uri: ENDPOINT
})

networkInterface.use([{
  applyMiddleware(req, next) {
    if (!req.options.headers) {
      req.options.headers = {}; // Create the header object if needed.
    }
    // get the authentication token from local storage if it exists
    req.options.headers.authorization = localStorage.getItem(GRAPHCOOL_TOKEN_STORAGE_KEY) || null;
    next();
  }
}]);

const client = new ApolloClient({
  networkInterface
})

// Pass config object of this form
// graphCool: {
//   endpoint: 'ENDPOINT'
// },
// localStorage: {
//   auth0IdToken: 'xxx',
//   graphcoolToken: 'xxx'
// },
// auth0: {
//   domain: 'xxx',
//   clientId: 'xxx'
// }
module.exports = function (config = {}) {}