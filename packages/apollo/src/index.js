import {
  Store,
  createStore,
  Lock,
  createLock,
  jwtUtil,
  setup
} from '@tecla5/gc-auth0-common'

import createClient from './create-client'
import GCAuth0Connector from './connector'

function apolloSetup(config) {
  setup({
    createLock,
    createStore,
    createClient
  }, config)
}

export default {
  createClient,
  GCAuth0Connector,
  Lock,
  createLock,
  jwtUtil,
  Store,
  createStore,
  setup,
  apolloSetup
}