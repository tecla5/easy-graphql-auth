const {
  Store,
  createStore,
  Lock,
  createLock,
  jwtUtil,
  setup
} = require('@graphcool/gc-auth-common')

module.exports = {
  GCAuth0Connector: require('./connector'),
  createClient: require('./create-client'),
  Lock,
  createLock,
  jwtUtil,
  Store,
  createStore,
  setup
}