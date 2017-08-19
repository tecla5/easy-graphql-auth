# Easy Auth0 Lock

Makes it easy to use and integrate [Auth0 Lock](https://auth0.com/lock) authentication.

<img src="https://github.com/tecla5/easy-graphql-auth/raw/master/pics/Auth0-Lock.png" alt="Auth0 Lock" width="50%" height="50%">

Retrieves user profile info and auth token from Auth provider

<img src="https://github.com/tecla5/easy-graphql-auth/raw/master/pics/Auth0-Lock-Provider.png" alt="Auth0 Lock" width="50%" height="50%">

Stores auth token in store (default: `localStorage`)

## Install

`npm i -S @tecla5/easy-auth0-lock`

## Included

- `Lock` - creates and manages Auth0 Lock
- `setup` - easy infrastructure setup for Auth0 Lock

## Initial Lock setup

You can include `lock` from CDN in your HTML page.

```html
<script src="http://cdn.auth0.com/js/lock/10.16.0/lock.min.js"></script>
```

Alternative: import/require it directly in your application scripts.

`import Auth0Lock from 'auth0-lock'`

### Quick setup

The `setup` method can be used for easy setup.

```js
import {
  setup,
  createStore,
  createLock
} from '@tecla5/easy-auth0-lock'

import config from '../config'

import Auth0Lock from 'auth0-lock'

export default setup(config, {
  Auth0Lock,
  createStore,
  createLock
})
```

### Enabling GraphQL authentication

If you wish to enable GraphQL authentication as part of the auth flow, after initial auth provider (auth0) signin:

Subscribe to the `signedIn` event via `on('signedIn', cb)`.

Then have the observer `cb` function create and run the `GraphQLAuth` to authenticate with your GraphQL server and observe when it has signed in , ie. `gqlServerAuth.on('signedInOK', cb)`.

This approach is the most flexible, and can be used with any backend or API to register the user (profile) after signin.

```js
const lock = createLock(config, opts)
const graphQlAuth = createGraphQLAuth(config, opts)

graphQlAuth.onSuccess('signin', (data) => {
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

lock.onFailure('signin', (data) => {
  let {
    error
  } = data
  log.error(error)
}

lock.onSuccess('signin', (data) => {
  let {
    auth0Token,
    profile
  } = data

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
  // retrieve profile method override
  retrieveProfileMethod
  // custom factory method
  createLockUi,

  // names of keys to store
  keyNames,
  // (local) storage config obj
  storage,
  // store to use for storage
  store,
  // service configs (tokens etc)
  auth0
}
```

### Auth0Lock display

- `logo` - logo image (url to a `.png` file or similar)
- `title` - title under logo

### user

- `createUser`
- `signinUser`

### Service config

- `auth0`

### Getters

- `auth0IdTokenKeyName`

### Logout

- `logout()`
- `resetTokens()`

### Login

- `attemptLogin()`
- `attemptStorageLogin()`

### Lock events

- `subscribeAuthenticated()`
- `onAuthenticated(authResult)`
- `onHashParsed()`

### Profile

- `receiveProfile(auth0Token, authResult)`
- `createProfileReceivedCb(authResult)`
- `handleProfile({authResult, profile})`

### End of flow hooks

- `signedInFailure(err)` on signin failure
- `signedInOk({profile})` on signin success
- `loggedOut()` on logout

### Publish/subscribe hooks

Success

- `sign:in` on sign in success
- `sign:out` on sign out call observer function
- `storage:token:found` - auth token found in local storage
- `storage:token:saved` - auth token saved in local storage

Failure

- `sign:in` on sign in failure

### Custom events

You can also add custom pub/sub events using `on` and `publish`

- `on(myEventName, observer)`
- `publish(eventName, obj)`

### UI functions

- `showLock(config = {})` - display Auth0 modal Lock with display config

### Storage

- `resetStorage()`
- `setAuth0Token(auth0Token)`

### Error handlers

- `handleError(err)`
- `handleProfileError(err)`
- `handleSigninError(err)`

### Error handlers

- `handleQueryError(err)`
- `handleError(err)`

### Events

- `async onAuth0Login({auth0Token, profile})`

### Extract data

`extractAuth0config(authResult)`

## Custom lock

You can subclass and override any of these methods as you see fit.

```js
import {
  Lock,
  storage
} from '@tecla5/easy-auth0-lock'
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

## Tests

Tests are written and run using [ava](https://github.com/avajs/ava)

`$ npm test`

The folder `fakes` contains mocks useful for testing in a Node.js environment:

- fake `Auth0Lock` class
- fake `localstorage`

A typical test setup:

```js
import {
  FakeAuth0Lock
} from '@tecla5/easy-auth0-lock/fakes/fake-auth0-lock'

import from '@tecla5/easy-auth0-lock/fakes/mock-localstorage'

const Auth0Lock = FakeAuth0Lock
```

Good to go!!

## License

MIT - [Tecla5](http://tecla5.com) 2017, Kristian Mandrup
