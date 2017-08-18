# Feathers Auth0

Demo app showcasing how to configure a full client/server Feathers app with Auth0 authentication provider, using localstorage to store/retrieve JWT token.

## Strategy

- (1) You register your application with the OAuth Provider. This includes giving the provider a callback URL (more on this later). The provider will give you an app identifier and an app secret. The secret is basically a special password for your app.
- (2) You direct the user's browser to the OAuth provider's site, providing the app identifier in the query string.
- (3) The content provider uses the app identifier to retrieve information about your app. That information is then presented to the user with a login form. The user can grant or deny access to your application.
- (4) Upon making a decision, the provider redirects the user's browser to the callback URL you setup in the first step. It includes a short-lived authorization code in the querystring.
- (5) Your server sends a request to the OAuth provider's server. It includes the authorization code and the secret. If the authorization code and secret are valid, the provider returns an OAuth access token to your server. Some user data can also be sent.
- (6) Your server can save the user information into the `users` table. It can also use this access token to make requests to the provider's API. This same information can also be sent to the browser for use.
- (7) With Feathers, there is an additional step. After logging in, a JWT access token is stored in a cookie and sent to the browser. The client uses the JWT to authenticate with the server on subsequent requests.

Register your app with Auth0 authentication service.
Step 2, 3 and 4 is handled by Auth0 lock dialog.
Step 5, 6 and 7 can be handled by subclassing the `HttpAuthConn` (or `Configurable`)
Step 7 is best handled by using `localstorage` instead of a `cookie`.

## Feathers server configuration

[Feathers generator](https://github.com/feathersjs/generator-feathers) now has an option for [Auth0](auth0.com/) using [OAuth](https://oauth.net/).

If you follow the [Basic OAuth Guide](https://docs.feathersjs.com/guides/auth/recipe.oauth-basic.html), replacing `GitHub` with `Auth0`, you should be able to get it to work.

### Create Feathers app via CLI

```bash
npm install -g feathers-cli@latest
feathers generate app
```

### Add authentication

Run the `authentication` generator

```bash
feathers generate authentication
```

Select `Auth0` as authentication provider

```bash
? What authentication providers do you want to use? Other PassportJS strategies not in this list can still be configured manually. Auth0
```

Select additional config options

```bash
? What is the name of the user (entity) service? users
? What kind of service is it? NeDB
? What is the database connection string? nedb://../data
    force config/default.json
   create src/authentication.js
    force src/app.js
   create src/services/users/users.service.js
    force src/services/index.js
   create src/models/users.model.js
   create src/services/users/users.hooks.js
   create src/services/users/users.filters.js
   create test/services/users.test.js
   ...
```

Create an authentication entry in `config/default.json`

```js
"authentication": {
    "secret": "cc71e4f97a80c878491197399aabf74e9c0b115c9f8071e75b306c99c891a54b7171852f8c5508e1fe4dcfaedbb603178b0935261928592e487e628f2f669f3a752f2beb3661b29d521b36c8a39e1be6823c0362df5ef1e212d7f2daae789df1065293b98ec9b43309ffe24dba3a2ec2362c5ce5c9155c6438ec380bc7c56d6a169988c0f6754077c5129e8a0ee5fd85b2182d87f84312387e1bbefebe49ad1bf2dcf783e7d8cbee40272b141358b8e23150eee5ea8fc04b2a0f3d824e7fa9d46c025c619c3281af91b7a19fd760bccedae379b735c85024b25a9c91749935b2f29d5b69b2c1ff29368b4aa9cf426d9960302e5e7b903d53e18ccbe2325cf3b6",
    "strategies": [
      "jwt"
    ],
    "path": "/authentication",
    "service": "users",
    "jwt": {
      "header": {
        "type": "access"
      },
      "audience": "https://yourdomain.com",
      "subject": "anonymous",
      "issuer": "feathers",
      "algorithm": "HS256",
      "expiresIn": "1d"
    },
    "auth0": {
      "clientID": "auth0 client id", // Replace this with your app's Client ID
      "clientSecret": "auth0 client secret", // Replace this with your app's Client Secret
      "successRedirect": "/signin"
    },
    "cookie": {
      "enabled": true,
      "name": "feathers-jwt",
      "httpOnly": false,
      "secure": false
    }
  },
```

Setup the app to communicate with the Auth0 provider. Open the `default.json` configuration file. The generator added a key (`authentication.secret`) to the config for the provider you selected.

See this [jwt authentication guide](https://jonathanmh.com/express-passport-json-web-token-jwt-authentication-beginners/) for more details on how to configure to suit your needs.

## Feathers client config

On the client side (front end) we need to use a Auth0 lock hook to save the auth jwt token to localstorage using key `jwt` or similar.

```js
  storage: { // localstorage
    authTokenKeyName: 'authToken', // key to store auth0IdToken
  }
```

For full control and to avoid having multiple app configurations, extend or replace `Configurable` from `token-foundation` module and customize `configureStorage()` method to configure the localstorage using a custom (simpler?) approach.

Configure [Auth0 lock](https://auth0.com/docs/libraries/lock/v10) using `easy-auth0-lock` module and integrate it with the [feathers client app](https://github.com/feathersjs/feathers-client) as follows.

```js
const config = {
  // should match server-side key defined in localstorage.authTokenKeyName (see config file above)
  storage: {
    authTokenKeyName: 'jwt'
  }
  // more lock config options ...
}
const lock = createLock(config, opts)
lock.onSuccess('signin', (data) => {
  let {
    auth0Token,
    profile
  } = data

  // requires feathers client app
  // create user session on server using token
  let status = await feathers.service('sessions').create(data)

  // alternatively create user directly (with session)
  // let user = await feathers.service('users').create(data)
  console.log('signedIn', {
    data
  })
})
```

## Example

See the `feather-app` demo included (partly implements pattern described here)
Please help complete this example!

## License

MIT

Tecla 5, Kristian Mandrup
