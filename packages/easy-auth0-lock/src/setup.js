export function setup(config, opts = {}) {
  let {
    createStore,
    createLock
  } = opts

  if (createStore) {
    let keyNames = config.keyNames || config.storage
    config.store = createStore(keyNames, opts)
  }

  if (createLock) {
    lock = createLock(config, opts)
  }

  return {
    lock
  }
}
