# GraphCool Auth0 common

Common utilities for integration of GraphCool with Auth0

## Install

`npm i -S @tecla5/gql-auth0-common`

## Usage

Can be used by [GraphCool](https://www.graph.cool) [Auth0](https://auth0.com/) clients, such as:

- [apollo](https://github.com/apollographql)
- [lokka](https://github.com/kadirahq/lokka)
- other/custom clients

## Babel play

Experiment with Babel compile via `src/play.js` ;)

## In the lib

`@tecla5/gc-auth0-common` exports the following:

```js
import {
  BaseGCAuth0Connector,
  setup,
  Lock,
  createLock,
  Store,
  createStore
} from '@tecla5/gc-auth0'
```

## Auth0Lock

You can include it from CDN

```html
<script src="http://cdn.auth0.com/js/lock/10.16.0/lock.min.js"></script>
```

## Base Connector

The `BaseGCAuth0Connector` class can be subclassed as needed.

### Quick setup

The `setup` method can be used for a quick setup.

```js
import {
  createClient
} from '@tecla5/gc-auth0-apollo'
import {
  setup,
  createStore,
  createLock
} from '@tecla5/gc-auth0'
import config from '../config'
import Auth0Lock from 'auth0-lock'
config.Auth0Lock = Auth0Lock // class

export default setup({
  createClient,
  createStore,
  createLock
  // createAuth0Lock
}, config)
```

### Lock & client configuration

You can customize your setup as needed.

```js
import {
  createClient,
  GCAuth0Connector,
} from '@tecla5/gc-auth0-apollo'

import {
  createLock,
  createStore
} from '@tecla5/gc-auth0-apollo'

import Auth0Lock from 'auth0-lock'
import config from '../config'

// custom setup
config.Auth0Lock = Auth0Lock

config.store = createStore(config.storage)
const lock = createLock(config)
const client = createClient(config)

export default {
  lock,
  client
}
```

Then configure UI an event handler to display Auth0 lock modal popup and subscribe to authenticated event.

```js
$('#login').click(() => {
  lock
    .showLock()
    .subscribeAuthenticated()
})
```

By default the `Lock` constructor loads:

- GraphQL `queries` from `./queries`
- `Store` class from `./storage` (to save/load tokens from `localStorage`)

You can pass in your own `queries` and `store` if you like.

```js
const myLock = new Lock({
  queries: myQueries
  store: myStore
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

### Logout

- `logout()`
- `resetTokens()`

### Lock events

- `subscribeAuthenticated()`
- `onAuthenticated(authResult)`
- `onHashParsed()`
- `createProfileReceivedCb(authResult)`
- `handleProfile({authResult, profile})`

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
- `storeAuth0Token(auth0Token)`
- `storeGraphCoolToken(signinToken)`

### Error handlers

- `handleError(err)`
- `handleQueryError(err)`
- `handleProfileError(err)`
- `handleSigninError(err)`

### Async functions

- `async doCreateUser({auth0Token, profile})`
- `async doSigninUser({auth0Token,profile})`
- `async onAuth0Login({auth0Token, profile})`
- `async signinGraphcool({auth0Token, profile})`

### build

- `buildSigninUserData({auth0Token, profile})`
- `buildUserData({auth0Token, profile})`

### Fake data

- `fakeCreateUser(userData)`
- `fakeSigninUser(profile)`

## Custom lock

You can subclass and override any of these methods as you see fit.

```js
import {
  Lock,
  storage
} from '@tecla5/gc-auth0'
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

In the UI

```js
myLock
  .subscribeAuthenticated()
  .showLock(displayConfig)
```

### Hooking in

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

MIT 2017 Tecla5, Kristian Mandrup
