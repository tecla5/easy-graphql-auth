const {
  setup,
  Store,
  createStore,
  Lock,
  createLock,
  jwtUtil
} = require('@tecla5/gc-auth-common')

module.exports = {
  GCAuth0Connector: require('./connector'),
  createClient: require('./create-client'),
  // from gc-auth0-common
  Lock,
  createLock,
  jwtUtil,
  Store,
  createStore,
  setup
}