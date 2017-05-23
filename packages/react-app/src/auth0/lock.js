import {
  createConnection
} from '@tecla5/apollo-conn'
import {
  setup,
  createStore,
  createLock
} from '@tecla5/easy-auth0-lock'
import config from '../config'
import Auth0Lock from 'auth0-lock'
config.Auth0Lock = Auth0Lock

export default setup({
  createConnection,
  createStore,
  createLock
}, config)