import ApolloClient from 'apollo-client'

import {
  GraphQLConnector
} from '@tecla5/gql-auth0'

export class ApolloConnector extends GraphQLConnector {
  constructor(config = {}) {
    super(config)
    this.ApolloClient = config.ApolloClient || ApolloClient
    this.createNetworkInterface = this.ApolloClient.createNetworkInterface
  }

  configure() {
    let networkInterface = this.createNetworkInterface(this.connection)
    this.networkInterface = networkInterface
    let graphcoolTokenKeyName = this.keyNames.gqlServerTokenKeyName
    this.configureNetworkInterface()
    this.client = this.createApolloClient()
    return this
  }

  configureNetworkInterface() {
    this.networkInterface.use([this.networkMw()]);
  }

  networkMw() {
    return {
      applyMiddleware: (req, next) => {
        if (!req.options.headers) {
          req.options.headers = {}; // Create the header object if needed.
        }
        // get the authentication token from local storage if it exists
        req.options.headers.authorization = this.tokens.gqlServerToken
        next();
      }
    }
  }

  createApolloClient() {
    return new this.ApolloClient({
      networkInterface: this.networkInterface
    })
  }
}

export function createConnector(config) {
  return new Connector(config).configure()
}