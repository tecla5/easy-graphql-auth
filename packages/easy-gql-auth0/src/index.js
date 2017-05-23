import {
  setup,
  createStore,
  createLock
} from '@tecla5/easy-auth0-lock'
import Auth0Lock from 'auth0-lock'

export function createLock({
  config,
  createConnection
}) {
  config.Auth0Lock = Auth0Lock
  return setup({
    createConnection,
    createStore,
    createLock
  }, config)
}