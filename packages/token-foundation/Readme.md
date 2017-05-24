# Token foundation for Auth with GraphQL and Auth0

Foundation layer for Authentication with GraphQL via Auth0, compatible
with GraphQL clients such as:

- [apollo](https://github.com/apollographql)
- [lokka](https://github.com/kadirahq/lokka)
- custom clients

## Install

`npm i -S @tecla5/token-foundation`

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

## Tests

Tests are written and run using [ava](https://github.com/avajs/ava)

`$ npm test`

To mock `localStorage` for unit testing in node env:

```js
global.window = {}
import localStorage from 'mock-local-storage'
window.localStorage = global.localStorage
```

## License

MIT 2017 Tecla5, Kristian Mandrup
