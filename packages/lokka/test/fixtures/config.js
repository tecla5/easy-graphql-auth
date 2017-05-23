export default {
  gqlServer: {
    connection: { // used by apollo
      uri: 'https://api.graph.cool/simple/v1/cj2rloi1qdont01601k6x1qe8'
    },
    endpoint: 'https://api.graph.cool/simple/v1/cj2rloi1qdont01601k6x1qe8' // Your graphcool simple api endpoint url goes here
  },
  // localstorage
  storage: {
    gqlServerTokenKeyName: 'graphcoolToken', // key to store graphcoolToken
    auth0IdTokenKeyName: 'xxx', // key to store auth0IdToken
  },
  auth0: { // from auth0 client app settings
    domain: 'xxx', // Your auth0 domain
    clientId: 'xxx' // // Your auth0 client id
  }
}