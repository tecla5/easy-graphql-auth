# GraphCool Auth0 common

GraphQL connection settings and token store configuration.

## Install

`npm i -S @tecla5/easy-gql-auth`

## Dependencies

- [@tecla5/token-foundation](https://github.com/tecla5/token-foundation)

Extends `Configurable` class, which provides basic configuration functionality, token store, logging and pub/sub.

## Usage

Can be used as base functionality for any library that wants to connect to a GraphQL server and use a token store, such as for authentication purposes.

This lib is currently used by:

- [easy-gql-auth](https://github.com/tecla5/easy-gql-auth)
- [apollo-auth](https://github.com/tecla5/apollo-auth)
- [lokka-auth](https://github.com/tecla5/lokka-auth)

## Included

- `GraphQLConnection` class, a GraphQL server base class to be extended

## GraphQLConnection class

The constructur calls `validateConnection` which by default validates if `store` and `keyNames` are defined for auth to retrieve the auth token.

You can override this behavior for a custom auth token strategy if needed.

### Validation

- `validateConnection` validates that connection settings are valid

### Getters

- `authTokenKeyName` the key name used to store the auth token
- `authIdToken` get the auth token from the store if present

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
