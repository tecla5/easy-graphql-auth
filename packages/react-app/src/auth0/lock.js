const {
  client,
  GCAuth0Connector,
  // from gc-auth0-common
  Lock,
  createLock,
  jwtUtil
} = require('@graphcool/gc-auth0-apollo')

const config = require('../config')
const myClient = client(config)

const lock = createLock(config)

module.exports = lock