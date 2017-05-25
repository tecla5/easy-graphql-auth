import {
  createConnection
} from '@tecla5/apollo-auth-conn'
import {
  setup,
  createStore,
  createLock
} from '@tecla5/easy-auth0-lock'
import config from '../config'
import Auth0Lock from 'auth0-lock'

export default setup(config, {
  Auth0Lock,
  createConnection,
  createStore,
  createLock
})