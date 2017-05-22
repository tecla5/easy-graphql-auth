import GCAuth0Connector from './connector'

function createGCAuth0Connector(config) {
  return new GCAuth0Connector(config).configure()
}

export default function (config = {}) {
  const gcAuth0Conn = config.createGCAuth0Connector(config) || createGCAuth0Connector(config)
  return gcAuth0Conn.client
}