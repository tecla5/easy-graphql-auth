module.exports = function (config) {
  config.store = config.createStore(config.storage)
  const lock = config.createLock(config)
  const client = config.createClient(config)

  return {
    lock,
    client
  }
}