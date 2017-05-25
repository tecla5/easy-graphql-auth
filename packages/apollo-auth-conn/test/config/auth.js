export default {
  storage: { // localstorage
    authTokenKeyName: 'authToken', // key to store auth0IdToken
  },
  auth: {
    auth0: { // from auth0 client app settings
      domain: 'my-domain.eu.auth0.com', // Your auth0 domain
      clientId: 'eBJl2So7la74jl5xP8Gl3EOolqJnXMO6' // // Your auth0 client id
    }
  }
}