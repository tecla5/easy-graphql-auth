# Apollo Auth Connection

Auth library for connecting to GraphQL server with Apollo using [gql-auth](https://github.com/tecla5/gql-auth) lib

See [apollo network](http://dev.apollodata.com/core/network.html)

<img src="https://github.com/tecla5/easy-graphql-auth/raw/master/pics/GraphQL-client-auth.png" alt="GraphQL Auth" width="50%" height="50%">

## Install

`npm i -S @tecla5/apollo-auth-conn`

## Usage

### Client configuration

```js
import {
  // ApolloAuthConnection as Connection,
  createConnection
} from '@tecla5/apollo-auth-conn'

import ApolloClient, {
  createNetworkInterface
} from 'apollo-client'

import config from '../config'

const connection = createConnection(config, {
  ApolloClient,
  createNetworkInterface
})
```

## Customization

You can extend `ApolloConnection` with your own custom configuration and provide a custom factory method `createConnection` on the config object as shown here:

```js
import {
  createConnection,
  ApolloAuthConnection
} from '@tecla5/apollo-auth-conn'

class MyGCAuthConnection extends ApolloAuthConnection {
  // ...
  constructor(config, opts) {
    super(config, opts)
    // custom
  }
  // ...
}

function createConnection(config, opts) {
  return new MyGCAuthConnection(config, opts).connect()
}
```

## Config object

Use a configuration object of the following form

```js
export default {
  gqlServer: {
    connection: { // used by apollo connection configuration
      uri: 'xxx', // graphQL endpoint
      // ... more networkInterface config
    },
    // graphQL endpoint
    endpoint: 'xxx',  // used as connection.uri if no connection setting)
  },
  storage: { // localstorage
    authTokenKeyName: 'authToken'
  }
}
```

## ApolloAuthConnection

The `ApolloAuthConnection` extends `GraphQLConnection` from [gql-auth](https://github.com/tecla5/gql-auth)

The superclass calls `validateConnection` which by default validates if `store` and `keyNames` are defined for auth to retrieve the auth token.

You can override this behavior for a custom auth token strategy if needed.

### Getters

- `authTokenKeyName` the key name used to store the auth token
- `authToken` get the auth token from the store if present

## Tests

Tests are written and run using [ava](https://github.com/avajs/ava)

`$ npm test`

## License

MIT - [Tecla5](http://tecla5.com) 2017, Kristian Mandrup
