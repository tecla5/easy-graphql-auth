const env = process.env

export default {
  gqlServer: {
    connection: { // used by apollo
      uri: env.gqlServer_endpoint || 'https://api.graph.cool/simple/v1/aj2rloi1qdont01601k6x1qe9'
    },
    endpoint: env.gqlServer_endpoint || 'https://api.graph.cool/simple/v1/aj2rloi1qdont01601k6x1qe9' // Your graphcool simple api endpoint url goes here
  },
  storage: {
    gqlServerTokenKeyName: env.gqlServer_tokenKeyName || 'gqlAuthToken' // key to store graphcoolToken
  }
}
