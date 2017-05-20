const {
  Lock,
  createLock,
  jwtUtil
} = require('@graphcool/gc-auth-common')

module.exports = {
  GCAuth0Connector: require('./gc-auth-connector'),
  client: require('./client'),
  Lock,
  createLock,
  jwtUtil
}