import {
  createLock as defaultCreateLock
} from './lock'

export function setup(config, opts = {}) {
  let {
    createStore,
    createLock
  } = opts

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
