# GraphCool Auth0 common

Common utilities for integration of GraphCool with Auth0

## Install

`npm i -S @tecla5/easy-gql-auth`

## Usage

Easy GraphQL authentication for clients, such as:

- [apollo](https://github.com/apollographql)
- [lokka](https://github.com/kadirahq/lokka)
- custom clients

## Included

- `GraphQLConnection` GraphQL server base class to be extended
- `GraphQLAuth` - GraphQL server authentication

## GraphQLConnection

The `GraphQLConnection` class can be subclassed as needed.

The constructur calls `validateConnection` which by default validates if `store` and `keyNames` are defined for auth to retrieve the auth token.

You can override this behavior for a custom auth token strategy if needed.

### Getters

- `authTokenKeyName` the key name used to store the auth token
- `authIdToken` get the auth token from the store if present

## GraphQLAuth

Performs authentication with GraphQL server via a GraphQL client such as `apollo`, `lokka` or a custom client

### GraphQL queries

- `createUser`
- `signinUser`

### Service config

- `auth`
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

- `gqlServerTokenKeyName`

### Storage

- `setGraphQLServerToken(signinToken)`

### Error handlers

- `handleError(err)`
- `handleProfileError(err)`
- `handleSigninError(err)`

## GraphQLServerAuth

- `async signin(data)` - start signin

### Mutation queries

- `async doCreateUser({auth0Token, profile})`
- `async doSigninUser({auth0Token,profile})`

### Error handlers

- `handleQueryError(err)`
- `handleError(err)`

### Extract data

`extractSignedInUserToken(signinResult)`

#### build

Build data to be sent to GraphQL mutation queries

- `buildSigninUserData({auth0Token, profile})`
- `buildUserData({auth0Token, profile})`

### GraphQL Queries

Using supplied GraphQL client (see `apollo-auth0` and `lokka-auth0`).
See [query batching](http://dev.apollodata.com/core/network.html#query-batching)

- `async doQuery({ query })`

### Fake data

Allow use of fake data if no GraphQL queries defined

- `fakeCreateUser(userData)`
- `fakeSigninUser(profile)`

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

Sample GraphQL queries to pass in `config` object. See [query batching](http://dev.apollodata.com/core/network.html#query-batching)

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

To mock `localStorage` for unit testing in node env:

```js
global.window = {}
import localStorage from 'mock-local-storage'
window.localStorage = global.localStorage
```

## License

MIT 2017 Tecla5, Kristian Mandrup
