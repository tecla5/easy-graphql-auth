# GraphCool Auth0 common

Common utilities for integration of GraphCool with Auth0

## Install

`npm i -S @graphcool/gc-auth0-common`

## Usage

Can be used by [GraphCool](https://www.graph.cool) [Auth0](https://auth0.com/) clients, such as:

- [apollo](https://github.com/apollographql)
- [lokka](https://github.com/kadirahq/lokka)
- other/custom clients

```js
const {
  Lock,
  queries,
  store,
  jwtUtil
} = require('@graphcool/gc-auth0-common')
const config = require(./config)

const myLock = new Lock(config)
myLock
  .subscribeAuthenticated()
  .showLock()
```

By default the `Lock` constructor loads:

-  GraphQL `queries` from `./queries`
- `Store` class from `./storage` (to save/load tokens from `localStorage`)

You can pass in your own `queries` and `store` if you like.

```js
const myLock = new Lock({
  queries: myQueries
  store: myStore
})
```

### Logout

- `logout()`
- `resetTokens()`

### Lock events

- `subscribeAuthenticated()`
- `onAuthenticated(authResult)`
- `createProfileReceivedCb(authResult)`
- `handleProfile({authResult, profile})`

### UI functions

- `showLogin()` - display Auth0 modal login

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

## Customization

You can subclass and override any of these methods as you see fit.

```js
const {
  Lock,
  queries,
  storage
} = require('@graphcool/gc-auth0-common')
const config = require(./config)

class MyLock extends Lock {
  // ...
  constructor(config) {
    super(config)
  }
  // ...
}

const myLock = new MyLock(config)
myLock
  .subscribeAuthenticated()
  .showLock()
```

