import {
  createLock as defaultCreateLock
} from './lock'

import {
  createStore as defaultCreateStore
} from '@tecla5/token-foundation'

export function setup(config, opts = {}) {
  let {
    createStore,
    createLock
  } = opts

  createStore = createStore || defaultCreateStore
  createLock = createLock || defaultCreateLock

  if (!createLock) {
    throw Error('Missing createLock (function) option to create the Auth0 lock')
  }

  if (createStore) {
    let keyNames = config.keyNames || config.storage
    config.store = createStore(keyNames, opts)
  }

  let lock = createLock(config, opts)
  return {
    lock
  }
}
