# Token foundation for Auth with GraphQL and Auth0

Foundation layer for Authentication with GraphQL.
Compatible with GraphQL clients such as:

- [apollo](https://github.com/apollographql)
- [lokka](https://github.com/kadirahq/lokka)
- custom clients

<img src="https://github.com/tecla5/easy-graphql-auth/raw/master/pics/token-foundation.png" alt="GraphQL Auth" width="100%" height="100%">

## Install

`npm i -S @tecla5/token-foundation`

### Used by

- [gql-conn](https://github.com/tecla5/gql-conn)
- [easy-auth0-lock](https://github.com/tecla5/easy-auth0-lock)

## Usage

```js
import {
  Configurable,
  keyNames,
  Loggable,
  Store,
  createStore
} from '@tecla5/token-foundation`
```

### Store

The `Store` is typically wrapper around a `localStorage` in the browser but can be configured for any storage system, even a remote one (via HTTP calls) if needed.

- `getItem(key)`
- `setItem(key, value)`
- `removeItem(key)`

### Loggable

The `Loggable` class is used to `log` messages.

#### Configuration

Pass a `name` in the config to tell the logger for which class (or "thing") it is logging.

#### Methods

- `log(...msgs)`
- `error(msg)`

### keyNames

Contains the default key names used to store Auth tokens for graphQL and Auth0.

### storage

The `keyNames` passed to store will typically come from a `storage` object of the config object being used.

```js
  storage: { // localstorage
    authTokenKeyName: 'authToken', // key to store authToken
    gqlServerTokenKeyName: 'gqlAuthToken' // key to store token return by graphQL server
  }
```

## Tests

Tests are written and run using [ava](https://github.com/avajs/ava)

`$ npm test`

To mock `localStorage` for unit testing in node env:

```js
global.window = {}
import localStorage from 'mock-local-storage'
window.localStorage = global.localStorage
```

### Example test run

```bash
✔ ~/repos/tecla5/gc-auth0/packages/token-foundation [master|⚑ 1]
15:25 $ ava test/configurable.test.js
TAP version 13
# Configurable: storage from config
ok 1 - Configurable: storage from config
# Configurable: using defaultStore via storage option
ok 2 - Configurable: using defaultStore via storage option
# Configurable: pass store
ok 3 - Configurable: pass store
# extractProperty
ok 4 - extractProperty
# extractProperties
ok 5 - extractProperties

1..5
# tests 5
# pass 5
# fail 0
```

With Test coverage

```bash
$ nyc ava test/configurable.test.js
TAP version 13
# Configurable: storage from config
ok 1 - Configurable: storage from config
# Configurable: using defaultStore via storage option
ok 2 - Configurable: using defaultStore via storage option
# Configurable: pass store
ok 3 - Configurable: pass store
# extractProperty
ok 4 - extractProperty
# extractProperties
ok 5 - extractProperties

1..5
# tests 5
# pass 5
# fail 0

-----------------|----------|----------|----------|----------|----------------|
File             |  % Stmts | % Branch |  % Funcs |  % Lines |Uncovered Lines |
-----------------|----------|----------|----------|----------|----------------|
All files        |    60.63 |    54.08 |    66.67 |    62.07 |                |
...
```

## License

MIT - [Tecla5](http://tecla5.com) 2017, Kristian Mandrup
