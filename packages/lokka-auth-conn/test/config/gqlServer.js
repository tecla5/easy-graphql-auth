export default {
  gqlServer: {
    // used by apollo
    connection: {
      // also used by lokka if endpoint not defined
      uri: 'https://api.graph.cool/simple/v1/aj2rloi1qdont01601k6x1qe9xxx'
    },
    // Your graphcool simple api endpoint url goes here
    endpoint: 'https://api.graph.cool/simple/v1/aj2rloi1qdont01601k6x1qe9'
  },
  storage: {
    gqlServerTokenKeyName: 'gqlServerToken' // key to store graphcoolToken
  }
}
