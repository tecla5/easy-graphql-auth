export function setup(exe, config) {
  let lock, connector, client
  if (exe.createStore) {
    config.store = exe.createStore(config.storage)
  }
  if (exe.createLock) {
    lock = exe.createLock(config)
  }
  if (exe.createConnector) {
    connector = exe.createConnector(config)
    client = connector.client
  }

  return {
    lock,
    connector,
    client
  }
}