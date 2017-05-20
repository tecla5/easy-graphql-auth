const ApolloClient = require('apollo-client')
const {
  createNetworkInterface
} = ApolloClient

const GCAuth0Connector = require('./connector')

function createGCAuth0Connector(config) {
  return new GCAuth0Connector(config).configure()
}

module.exports = function (config = {}) {
  const gcAuth0Conn = config.createGCAuth0Connector(config) || createGCAuth0Connector(config)
  return gcAuth0Conn.client
}