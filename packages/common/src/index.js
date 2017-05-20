const {
  Lock,
  createLock
} = require('./lock')

module.exports = {
  Lock,
  createLock,
  queries: require('./queries'),
  storage: require('./storage'),
  jwtUtil: require('./jwt-util')
}