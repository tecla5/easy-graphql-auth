# GraphQL connection config

GraphQL client connection settings and token store configuration.

<img src="https://github.com/tecla5/easy-graphql-auth/raw/master/pics/GraphQL-client-auth.png" alt="GraphQL Auth" width="50%" height="50%">

## Install

`npm i -S @tecla5/easy-gql-auth`

## Dependencies

- [@tecla5/token-foundation](https://github.com/tecla5/token-foundation)

Extends `Configurable` class, which provides basic configuration functionality, token store, logging and pub/sub.

## Usage

Can be used as base functionality for any library that wants to connect to a GraphQL server and use a token store, such as for authentication purposes.

This lib is currently used by:

- [easy-gql-auth0](https://github.com/tecla5/easy-gql-auth0)
- [apollo-auth-conn](https://github.com/tecla5/apollo-auth-conn)
- [lokka-auth-conn](https://github.com/tecla5/lokka-auth-conn)

## Included

- `GraphQLConnection` class, a GraphQL server base class to be extended

## GraphQLConnection class

The constructur calls `validateConnection` which by default validates if `store` and `keyNames` are defined for auth to retrieve the auth token.

You can override this behavior for a custom auth token strategy if needed.

### Validation

- `validateConnection` validates that connection settings are valid

### Getters

- `authTokenKeyName` the key name used to store the auth token
- `authToken` get the auth token from the store if present

### setJwtToken

- `setJwtToken({signinToken})` used to set JWT token on HTTP header

The `signinToken` is received from the GraphQL server on a successful signin with an auth provider.

## Tests

Tests are written and run using [ava](https://github.com/avajs/ava)

`$ npm test`

To mock `localStorage` for unit testing in node env:

```js
global.window = {}
import localStorage from 'mock-local-storage'
window.localStorage = global.localStorage
```

### Test coverage

```bash
$ nyc ava test/connection.test.js
...
1..1
# tests 1
# pass 1
# fail 0

-------------------|----------|----------|----------|----------|----------------|
File               |  % Stmts | % Branch |  % Funcs |  % Lines |Uncovered Lines |
-------------------|----------|----------|----------|----------|----------------|
All files          |    82.76 |       60 |      100 |    80.77 |                |
 gql-connection.js |    82.76 |       60 |      100 |    80.77 | 35,39,45,48,49 |
-------------------|----------|----------|----------|----------|----------------|
```

## License

MIT - [Tecla5](http://tecla5.com) 2017, Kristian Mandrup
