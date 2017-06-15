# GraphCool Auth0 common

Easy GraphQL server authentication for clients, such as:

- [apollo](https://github.com/apollographql)
- [lokka](https://github.com/kadirahq/lokka)
- custom clients

<img src="https://github.com/tecla5/easy-graphql-auth/raw/master/pics/GraphQL-Auth.png" alt="GraphQL Auth" width="50%" height="50%">

## Install

`npm i -S @tecla5/gql-auth`

### Dependencies

- [@tecla5/gql-conn](https://github.com/tecla5/gql-conn)

`gql-conn` contains the `GraphQLConnection` base class which configures graphQL server connection settings and token store.

### Included

- `GraphQLAuth` - GraphQL server authentication
- `createGraphQLAuth` factory method for `GraphQLAuth` class

## Usage

Use the `createGraphQLAuth(config, opts)` method to create the `GraphQLAuth` instance.

Then call `async signin({authToken, profile})` with `authToken` and `profile` received from auth provider.

Designed to works well with [setup-auth0-lock](https://github.com/tecla5/setup-auth0-lock) library, for which it can be tightly integrated just by passing `createGraphQLAuth` as an option.

### Create instance

```js
// custom GQL mutations to create and signin user on GraphQL server
import queries from './gql-user-queries'

let config = {
  gqlServer: {
    connection: { // used by apollo
      uri: 'https://api.graph.cool/simple/v1/aj2rloi1qdont01601k6x1qe9'
    },
    endpoint: 'https://api.graph.cool/simple/v1/aj2rloi1qdont01601k6x1qe9' // Your graphcool simple api endpoint url goes here
  },
  storage: {
    // key to store gql server auth token
    gqlServerTokenKeyName: 'gqlServerToken',
    // key to store auth provider token
    authTokenKeyName: 'authToken'
  },
  queries
}

import { createConnection } from '@tecla5/apollo-auth-conn'

let graphQLAuth = createGraphQLAuth(config, {
  createConnection
})

// perform auth login via auth provider such as Auth0
```

After receiving `authToken`, `profile` from signin via auth provider

```js
let result = await graphQLAuth.signin({authToken, profile})
```

Callin `signin` willl execute the registered GraphQL mutation `queries` on the GraphQL server. The queries will be expected to save the `authToken` on the authenticated user. The flow will then expect to receive an `authToken` from the graphQL server which it will save in the token store and add to the `connection` header as a JWT token, for use on subsequent requests to the GraphQL server.

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

## GraphQLServerAuth

- `async signin(data)` - start signin

### Mutation queries

- `async doCreateUser({authToken, profile})`
- `async doSigninUser({authToken,profile})`

### Error handlers

- `handleQueryError(err)`
- `handleError(err)`

### Extract data

`extractSignedInUserToken(signinResult)`

### Events pub/sub

- `jwt:token` - set JWT token
- `server:signin` - signed in with token on server
- `token:stored` - token stored on server
- `token:received` - token received from server
- `user:create` - user created on server

#### server:signin

*success*

```js
({
  authToken,
  profile,
  userData,
  result
})
```

*failure*

```js
({
  authToken,
  profile,
  userData,
  error
})
```

#### build

Build data to be sent to GraphQL mutation queries

- `buildSigninUserData({authToken, profile})`
- `buildUserData({authToken, profile})`

### GraphQL Queries

Using supplied GraphQL client (see `apollo-auth-conn` and `lokka-auth-conn`).
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

## License

MIT - [Tecla5](http://tecla5.com) 2017, Kristian Mandrup
