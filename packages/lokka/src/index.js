import {
  setup,
  Store,
  createStore,
  Lock,
  createLock,
  jwtUtil
} from '@tecla5/gc-auth0-common'

import GCAuth0Connector from './connector'
import createClient from './create-client'

export default {
  GCAuth0Connector,
  createClient,
  // from gc-auth0-common
  Lock,
  createLock,
  jwtUtil,
  Store,
  createStore,
  setup
}