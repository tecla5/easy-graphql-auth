# Feathers Auth0

Demo app showcasing how to configure a full client/server Feathers app with Auth0 authentication provider, using localstorage to store/retrieve JWT token.

Note: Ideally this demo app should be using the `app-auth` package (see `/packages`) which contain generic setup code suitable for most client apps.

## Status

_Work In Progress_

Please help out to make this a good feathers auth0 demo app.

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

Create (or ensure you have) an `authentication` entry in `config/default.json`

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

See this [jwt authentication guide](https://jonathanmh.com/express-passport-json-web-token-jwt-authentication-beginners/) for more details on how to configure to suit your needs.

## Feathers client config

On the client side (front end) we need to use a Auth0 lock success hook to save the auth jwt token (received from Auth0) to `localstorage` using a key such as `jwt`, `authToken`, `accessToken` or whatever you prefer.

```js
  storage: { // localstorage
    authTokenKeyName: 'accessToken', // key to store auth0IdToken
  }
```

For full control and to avoid having multiple app configurations, extend or replace `Configurable` from `token-foundation` module and customize `configureStorage()` method to configure the localstorage using a custom (simpler?) approach.

Configure [Auth0 lock](https://auth0.com/docs/libraries/lock/v10) using `easy-auth0-lock` module and integrate it with the [feathers client app](https://github.com/feathersjs/feathers-client) as follows.

First we create and configure the auth0 lock wrapper, using `createLock` factory method, passing a `config` object and additional options such as enabling logging.

```js
const config = {
  // should match server-side key defined in localstorage.authTokenKeyName (see config file above)
  storage: {
    authTokenKeyName: 'accessToken'
  }
  // more lock config options ...
}
const opts = {}
const lock = createLock(config, opts)
lock
  .enableLog()
```

We can enable logging on the lock wrapper using `enableLog`, useful during development for debugging.

Then we create a signin method which should perform the signin with the server app, using the JWT access token received from Auth0.

```js
function serverSignin(data) => {
  let {
    auth0Token,
    profile
  } = data

  // requires feathers client app
  // create user session on server using token
  let status = await feathers.service('sessions').create(data)

  // create user (with session) if user doesn't yet exist
  // let user = await feathers.service('users').create(data)
  console.log('signedIn', {
    data
  })
}

lock
  .subscribeAuthenticated()
  .onSuccess('signin', serverSignin)
```

We subscribe to the authenticated callback of the Auth0 lock and call `serverSignin` in case `signin` with Auth0 is successful.

The key to understanding the Auth0 lock wrapper, is that `onHashParsed()` will show the lock dialog (ie. for signin/signup) only if the token is not already found in the url.

See lock [events](https://github.com/auth0/lock#onevent-callback) and [Auth0Lock instance](https://github.com/auth0/lock#new-auth0lockclientid-domain-options)for more details.

```js
  lock.getUserInfo(authResult.accessToken, function(error, profile) {
    if (error) {
      // handle error and return;
      handleErr(err);
      return;
    }
    localStorage.setItem("accessToken", authResult.accessToken);
    // optionally store/cache profile as well
    localStorage.setItem("profile", JSON.stringify(profile));
    // update DOM
  })
```

You can look into `receiveProfile(auth0Token, authResult)` in the `Lock` class of the `easy-auth0-lock` package, which handles this part of the flow. The method `attemptStorageLogin()` will try to use the `token` in localstorage if present to trigger a normal login flow, short-circuiting the lock dialog entirely (will be called if token not found via `hash_parsed` in URL. You can enhance `attemptStorageLogin()` to use a cached profile (stored in localstorage as in above code example) as well.

Use `this.signedIn()` to notify a successful signin/login (such as to update DOM and client state accordingly).

You can use the `AppAuth` class from `app-auth` package for most of the plumbing required on the client.

## Example

See the `feather-app` demo included (partly implements pattern described here)
Please help complete this example!

## License

MIT

Tecla 5, Kristian Mandrup
