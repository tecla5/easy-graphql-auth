export function setup(config, opts = {}) {
  let {
    createStore,
    createConnection,
    createLock
  } = opts

  let lock, connection, client
  if (createStore) {
    let keyNames = config.keyNames || config.storage
    config.store = createStore(keyNames, opts)
  }

  if (createConnection) {
    connection = createConnection(config, opts)
    client = connector.client
  }
  config.client = client
  config.connection

  if (createLock) {
    lock = createLock(config, opts)
  }

  return {
    lock,
    connection,
    client
  }
}