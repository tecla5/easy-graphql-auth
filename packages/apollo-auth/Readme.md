# Apollo Auth

Auth library for connecting to GraphQL server with Apollo using [easy-gql-auth](https://github.com/tecla5/easy-gql-auth) lib

See [apollo network](http://dev.apollodata.com/core/network.html)

## Install

`npm i -S @tecla5/apollo-auth`

## Usage

### Client configuration

```js
import {
  // ApolloAuthConnection as Connection,
  createConnection
} from '@tecla5/apollo-auth'

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
} from '@tecla5/gql-apollo'

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
    auth0IdTokenKeyName: 'auth0IdToken'
  }
}
```

## ApolloAuthConnection

The `ApolloAuthConnection` extends `GraphQLConnection` from [easy-gql-auth](https://github.com/tecla5/easy-gql-auth)

The superclass calls `validateConnection` which by default validates if `store` and `keyNames` are defined for auth to retrieve the auth token.

You can override this behavior for a custom auth token strategy if needed.

### Getters

- `authTokenKeyName` the key name used to store the auth token
- `authIdToken` get the auth token from the store if present

## Tests

Tests are written and run using [ava](https://github.com/avajs/ava)

`$ npm test`

## License

MIT 2017 Tecla5, Kristian Mandrup
