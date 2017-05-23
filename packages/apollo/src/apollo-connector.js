import ApolloClient from 'apollo-client'
const {
  createNetworkInterface
} = ApolloClient

import {
  GraphQLConnector
} from '@tecla5/gql-auth0'

export class ApolloConnector extends GraphQLConnector {
  constructor(config = {}) {
    super(config)
  }

  configure() {
    let networkInterface = createNetworkInterface(this.connection)
    this.networkInterface = networkInterface
    let graphcoolTokenKeyName = this.keyNames.gqlServerTokenKeyName
    networkInterface.use([{
      applyMiddleware(req, next) {
        if (!req.options.headers) {
          req.options.headers = {}; // Create the header object if needed.
        }
        // get the authentication token from local storage if it exists
        req.options.headers.authorization = this.tokens.gqlServerToken
        next();
      }
    }]);

    this.client = new ApolloClient({
      networkInterface
    })
  }
}

export function createConnector(config) {
  return new Connector(config).configure()
}