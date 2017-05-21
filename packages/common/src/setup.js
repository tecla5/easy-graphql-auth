const {
  createClient,
  createLock,
  createStore
} = require('@tecla5/gc-auth0-apollo')

module.exports = function (config) {
  config.store = createStore(config.storage)
  const lock = createLock(config)
  const client = createClient(config)

  return {
    lock,
    client
  }
}