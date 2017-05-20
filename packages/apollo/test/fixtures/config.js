module.exports = {
  graphCool: {
    connection: { // used by apollo
      uri: 'xxx'
    },
    endpoint: 'xxx' // Your graphcool simple api endpoint url goes here
  },
  localStorage: { // localstorage
    auth0IdToken: 'xxx', // key to store auth0IdToken
    graphcoolToken: 'xxx' // key to store graphcoolToken
  },
  auth0: { // from auth0 client app settings
    domain: 'xxx', // Your auth0 domain
    clientId: 'xxx' // // Your auth0 client id
  }
}