export default {
  gqlServer: {
    connection: { // used by apollo
      uri: 'https://api.graph.cool/simple/v1/cj2rloi1qdont01601k6x1qe6'
    },
    endpoint: 'https://api.graph.cool/simple/v1/cj2rloi1qdont01601k6x1qe8' // Your graphcool simple api endpoint url goes here
  },
  storage: {
    gqlServerTokenKeyName: 'graphcoolToken' // key to store graphcoolToken
  }
}