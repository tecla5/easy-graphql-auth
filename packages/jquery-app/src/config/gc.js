export default {
  gc: {
    connection: { // used by apollo
      uri: 'https://api.graph.cool/simple/v1/aj2rloi1qdont01601k6x1qe9'
    },
    endpoint: 'https://api.graph.cool/simple/v1/aj2rloi1qdont01601k6x1qe9' // Your graphcool simple api endpoint url goes here
  },
  storage: {
    gqlServerTokenKeyName: 'gqlAuthToken' // key to store graphcoolToken
  }
}