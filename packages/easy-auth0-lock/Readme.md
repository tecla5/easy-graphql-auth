# Easy Auth0 Lock

Makes it easy to use and integrate [Auth0 Lock](https://auth0.com/lock) authentication.

<img src="https://github.com/tecla5/easy-graphql-auth/raw/master/pics/Auth0-Lock.png" alt="Auth0 Lock" width="50%" height="50%">

Retrieves user profile info and auth token from Auth provider

<img src="https://github.com/tecla5/easy-graphql-auth/raw/master/pics/Auth0-Lock-Provider.png" alt="Auth0 Lock" width="50%" height="50%">

Stores auth token in store (default: `localStorage`)

## Install

`npm i -S @tecla5/easy-auth0-lock`

## Usage

Designed for easy integration with GraphQL clients, such as:

- [apollo](https://github.com/apollographql)
- [lokka](https://github.com/kadirahq/lokka)

Can be also be used with any other backend.

## Included

- `Lock` - creates and manages Auth0 Lock
- `setup` - easy infrastructure setup for Lock

## Initial Lock setup

You can include `lock` from CDN in your HTML page.

```html
<script src="http://cdn.auth0.com/js/lock/10.16.0/lock.min.js"></script>
```

Alternative: import/require it directly in your application scripts.

### Quick setup

The `setup` method can be used for easy setup.

```js
import ApolloClient, {
  createNetworkInterface
} from 'apollo-client'

import {
  createConnection
} from '@tecla5/apollo-auth-conn'

const clientConfig = {
  ApolloClient,
  createNetworkInterface,
  createConnection
}

import {
  setup,
  createStore,
  createLock
} from '@tecla5/easy-auth0-lock'

import config from '../config'

import Auth0Lock from 'auth0-lock'

export default setup(config, {
  Auth0Lock,
  clientConfig,
  createStore,
  createLock
})
```

### Enabling GraphQL authentication

If you wish to enable GraphQL authentication as part of the auth flow, after initial auth provider (auth0) signin, you must additionally supply a `createGraphQLAuth` factory method (see [easy-gql-auth](https://github.com/tecla5/easy-gql-auth).

```js
const lock = createLock(config, {
  Auth0Lock,
  clientConfig,
  createStore,
  createGraphQLAuth
})
```

Alternatively subscribe to the `signedIn` event via `on('signedIn', cb)`.

Then have the observer `cb` function create and run the `GraphQLAuth` to authenticate with your GraphQL server and observe when it has signed in , ie. `gqlServerAuth.on('signedInOK', cb)`.

This approach is the most flexible, and can be used with any backend or API to register the user (profile) after signin.

```js
const lock = createLock(config, opts)
const graphQlAuth = createGraphQLAuth(config, opts)

graphQlAuth.on('signedInOK', (data) => {
  let {
    authToken,
    profile,
    userData,
    result
  } = data

  console.log('GraphQL signIn successful', {
    profile,
    userData
  })
})

lock.on('signedIn', (data) => {
  // or signin/signup user with alternative API/backend
  let status = await graphQlAuth.signin(data)

  console.log('signedIn', {
    status
  })
})

// Better yet, catch and react to signup error with remote server/API
lock.on('signedIn', (data) => {
  // or signin/signup user with alternative API/backend
  try {
    let success = await graphQlAuth.signin(data)
    mySuccessHandler('graphQlAuth signin success', success)
  } catch (err) {
    myErrorHandler('graphQlAuth signin malfunction', err)
  }
})

```

## UI lock configuration

In the UI, configure an event handler to display Auth0 lock modal popup and subscribe to lock `authenticated` event.

```js
$('#login').click(() => {
  lock
    .showLock()
    .subscribeAuthenticated()
})
```

By default `Lock` uses the `Store` class as key storage.
You can subclass or pass in your own `store` if you like.

```js
const myLock = new Lock({
  // Store: MyStore, -  custom subclass
  // createStore, - custom factory method
  // store: myStore, - custom instance
})
```

### Auth0 Lock Playground

Try out the [Auth0 Lock playground](https://auth0.github.io/playground/) to experiment with different display options.

## Controlling the lock

See the [Lock reference](https://auth0.com/docs/libraries/lock/v10/) and the [customization configuration](https://auth0.com/docs/libraries/lock/v10/customization) for options you can pass to fine tune the Lock behavior and visual appearance:

- [display](https://auth0.com/docs/libraries/lock/v10/customization#display-options)
- [theming](https://auth0.com/docs/libraries/lock/v10/customization#theming-options)
- [social](https://auth0.com/docs/libraries/lock/v10/customization#social-options)
- [authentication](https://auth0.com/docs/libraries/lock/v10/customization#authentication-setup)
- [database](https://auth0.com/docs/libraries/lock/v10/customization#database-options)
- [other](https://auth0.com/docs/libraries/lock/v10/customization#other-options)

### UI customization

See [ui customization](https://auth0.com/docs/libraries/lock/v10/ui-customization) page

### I18n

See [i18n](https://auth0.com/docs/libraries/lock/v10/i18n)

### Customized Auth0Lock

We can easily replace `AuthLock` with `Auth0LockPasswordless`:

`import Auth0LockPasswordless from 'auth0-lock-passwordless'`

Or import via HTML `<script>`

```html
<script src="http://cdn.auth0.com/js/lock-passwordless-2.2.min.js"></script>
```

```js
lock = createLock({
  createLockUi: function(auth0, opts) {
    return new Auth0LockPasswordless(auth0.clientId, auth0.domain)
  }
})

lock.prototype.onAuthenticated = function () {
  // or lock.magiclink() to send email message with magic link
  this.lock.sms(this.createProfileReceivedCb(authResult))
}

lock.prototype.createProfileReceivedCb = function() {
  return (err, profile, id_token) => {
    err ? this.handleProfileError(err) : this.handleProfile({
      profile,
      id_token
    })
  }
}
```

### Lock configuration

```js
{
  Auth0Lock,
  // Auth0Lock config
  title, // title of Auth0Lock form
  logo, // logo of Auth0Lock form
  theme, // theme config for Auth0Lock form
  dict, // text config for Auth0Lock form

  // showLock display/behavior configuration
  lockConfig,
  // display method override
  displayMethod
  // custom factory method
  createLockUi,

  // factory to create GraphQLServerAuth instance
  createGraphQLServerAuth,
  // GraphQL queries obj
  queries,

  // names of keys to store
  keyNames,
  // (local) storage config obj
  storage,
  // store to use for storage
  store,
  // service configs (tokens etc)
  auth0,
  gqlServer
}
```

### Auth0Lock display

- `logo` - logo image (url to a `.png` file or similar)
- `title` - title under logo

### GraphQL queries

- `createUser`
- `signinUser`

### Service config

- `auth0`
- `gqlServer`

#### createUser mutation

Pass whichever profile attributes such as `name`

```js
  mutation createUser($authToken: String!, $name: String){
    createUser(
      ...
    )
  }
```

#### signinUser mutation

Only needs the `authToken`

```js
  mutation signinUser($authToken: String!){
    signinUser(
      ...
    )
  }
```

### Getters

- `auth0IdTokenKeyName`
- `shouldDoGraphQLServerSignin` (bool)

`shouldDoGraphQLServerSignin` is used to determine if GraphQL server signin should be performed after successful auth0 signin.

By default tests if `.connection` or `.client` is set (passed by config object in constructor).

### Logout

- `logout()`
- `resetTokens()`

### Lock events

- `subscribeAuthenticated()`
- `onAuthenticated(authResult)`
- `createProfileReceivedCb(authResult)`
- `handleProfile({authResult, profile})`
- `onHashParsed()`

### End of flow hooks

- `signedInFailure(err)` on signin failure
- `signedInOk({profile})` on signin success
- `loggedOut()` on logout

### Publish/subscribe hooks

- `on('signedInFailure', function)` on signin failure call observer function (w object)
- `on('signedIn', function)` on signin success call observer function (w object)
- `on('loggedOut', function)` on logout call observer function

### Custom events

You can also add custom pub/sub events using `on` and `publish`

- `on(myEventName, observer)`
- `publish(eventName, obj)`

### UI functions

- `showLock(config = {})` - display Auth0 modal Lock with display config

### Storage

- `resetStorage()`
- `setAuth0Token(auth0Token)`
- `setGraphQLServerToken(signinToken)`

### Error handlers

- `handleError(err)`
- `handleProfileError(err)`
- `handleSigninError(err)`

### Async functions

- `async serverSignin(({auth0Token, profile})`

Creates a `GraphQLServerAuth` instance and attempts to signin to GraphQL server

## GraphQLServerAuth

- `async signin(data)` - start signin

### Getters/Setters

- `gqlServerTokenKeyName`
- `setGraphQLServerToken(signinToken)`

### Mutation queries

- `async doCreateUser({auth0Token, profile})`
- `async doSigninUser({auth0Token,profile})`

### Error handlers

- `handleQueryError(err)`
- `handleError(err)`

### Events

- `async onAuth0Login({auth0Token, profile})`

### Extract data

`extractSignedInUserToken(signinResult)`

#### build

Build data to be sent to GraphQL mutation queries

- `buildSigninUserData({auth0Token, profile})`
- `buildUserData({auth0Token, profile})`

### Fake data

Allow use of fake data if no GraphQL queries defined

- `fakeCreateUser(userData)`
- `fakeSigninUser(profile)`

## Custom lock

You can subclass and override any of these methods as you see fit.

```js
import {
  Lock,
  storage
} from '@tecla5/easy-gql-auth0'
import config from './config'

class MyLock extends Lock {
  // ...
  constructor(config) {
    super(config)
  }
  // ...
}

function createLock(config) {
  return new MyLock()
}

const myLock = createLock(config)
```

## In the UI

```js
myLock
  .subscribeAuthenticated()
  .showLock(displayConfig)
```

### Hookin' in

The recommended approach to "hook in" from your view/component layer, is to use the
pub/sub observer mechanism. This approach is demonstrated in the Vue and React demo apps.

```js
class App extends Component {
   constructor(props) {
    super(props);
    this.state = {
      isLoggedIn: false
    };

    this.doLogin = this.doLogin.bind(this);
    this.doLogout = this.doLogout.bind(this);

    lock.on('signedIn', this.loggedIn)
    lock.on('loggedOut', this.loggedOut)
  }
  // ...
}
```

### JWT utils

Sample jwt utility methods

```js
import decode from 'jwt-decode'

export function getTokenExpirationDate(token) {
  const decoded = decode(token)
  if (!decoded.exp) {
    return null
  }
  const date = new Date(0) // The 0 here is the key, which sets the date to the epoch
  date.setUTCSeconds(decoded.exp)
  return date
}

export function isTokenExpired(token) {
  const date = getTokenExpirationDate(token)
  const offsetSeconds = 0
  if (date === null) {
    return false
  }
  return !(date.valueOf() > (new Date().valueOf() + (offsetSeconds * 1000)))
}
```

### Queries

Sample GraphQL queries to pass in `config` object

```js
import gql from 'graphql-tag';

const createUser = gql `
  mutation createUser($authToken: String!, $name: String){
    createUser(
      authProvider: {
        auth0: {
          idToken: $authToken,
        }
      },
      name: $name
    ) {
      id,
      auth0UserId
    }
  }
`

const signinUser = gql `
  mutation signinUser($authToken: String!){
    signinUser(
      auth0: {
        idToken: $authToken
      }
    ) {
      token
      user {
        id,
        auth0UserId
      }
    }
  }
`

export default {
  createUser,
  signinUser
}
```

## Tests

Tests are written and run using [ava](https://github.com/avajs/ava)

`$ npm test`

## License

MIT - [Tecla5](http://tecla5.com) 2017, Kristian Mandrup
