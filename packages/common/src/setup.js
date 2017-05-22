export default function (exe, config) {
  config.store = exe.createStore(config.storage)
  const lock = exe.createLock(config)
  const client = exe.createClient(config)

  return {
    lock,
    client
  }
}