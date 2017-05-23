import {
  Store,
  createStore,
  Lock,
  createLock,
  jwtUtil,
  setup
} from '@tecla5/gql-auth0'

import {
  ApolloConnector as Connector,
  createConnector
} from './apollo-connector'

function apolloSetup(config) {
  return setup({
    createLock,
    createStore,
    createConnector
  }, config)
}

export default {
  createConnector,
  Connector,
  Lock,
  createLock,
  jwtUtil,
  Store,
  createStore,
  setup,
  apolloSetup
}