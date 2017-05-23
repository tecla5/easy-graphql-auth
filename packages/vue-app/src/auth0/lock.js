import {
  setup,
  createLock,
  createStore
} from '@tecla5/easy-auth0-lock'

import config from '../config'
import Auth0Lock from 'auth0-lock'
config.Auth0Lock = Auth0Lock

let {
  lock
} = setup({
  createLock,
  createStore,
  createConnection
}, config)

export default lock
