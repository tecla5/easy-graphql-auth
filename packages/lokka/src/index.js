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
} from './lokka-connector'

function lokkaSetup(config) {
  setup({
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
  lokkaSetup
}