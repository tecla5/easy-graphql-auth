# jQuery app with Auth0 using AppAuth

With `AppAuth` it is a breeze to add Auth0 authentication using jQuery.

```js
const lock = {}
lock.config = {
  storage: {
    // ...
    authTokenKeyName: 'jwtToken'
  },
  auth0: { // from auth0 client app settings
    domain: 'my-domain.eu.auth0.com', // Your auth0 domain
    clientId: 'xBJl2So7la74jl5xP8Gl3EOolqJnXMO6' // // Your auth0 client id
  }
}
lock.instance = easyAuth0Lock.createLock(config)

// will use jQuery API if available!
const auth = appAuth.configureAppAuth(lock.instance)
```
