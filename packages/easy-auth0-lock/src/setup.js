export function setup(exe, config) {
  let lock, connection, client
  config.AuthLock = config.AuthLock || exe.AuthLock
  if (exe.createStore) {
    config.store = exe.createStore(config.storage)
  }
  if (exe.createConnector) {
    connection = exe.createConnection(config)
    client = connector.client
  }
  config.client = client
  config.connection

  if (exe.createLock) {
    lock = exe.createLock(config)
  }

  return {
    lock,
    connection,
    client
  }
}