import {
  createClient
} from '@tecla5/gc-auth0-apollo'
import {
  setup,
  createStore,
  createLock
} from '@tecla5/gc-auth0'
import config from '../config'
import Auth0Lock from 'auth0-lock'
config.Auth0Lock = Auth0Lock

export default setup({
  createClient,
  createStore,
  createLock
}, config)