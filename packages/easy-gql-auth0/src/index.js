import {
  setup,
  createStore,
  createLock
} from '@tecla5/easy-auth0-lock'
import _Auth0Lock from 'auth0-lock'

export function createLock({
  config,
  createConnection,
  Auth0Lock
}) {
  config.Auth0Lock = Auth0Lock || _Auth0Lock
  return setup({
    createConnection,
    createStore,
    createLock
  }, config)
}