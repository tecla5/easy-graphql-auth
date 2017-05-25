import {
  setup,
  createStore,
  createLock
} from '@tecla5/easy-auth0-lock'

export function createLock(config, opts = {}) {
  let {
    createConnection,
    Auth0Lock
  } = opts
  Auth0Lock = Auth0Lock || config.Auth0Lock || _Auth0Lock

  return setup(config, {
    Auth0Lock,
    createConnection,
    createStore,
    createLock
  })
}