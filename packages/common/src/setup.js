export function setup(exe, config) {
  let lock, client
  if (exe.createStore) {
    config.store = exe.createStore(config.storage)
  }
  if (exe.createLock) {
    lock = exe.createLock(config)
  }
  if (exe.createClient) {
    client = exe.createClient(config)
  }

  return {
    lock,
    client
  }
}