# GraphQL server integration with Lokka

Small integration library for connecting to GraphQL server with Apollo using [token-foundation](https://github.com/tecla5/token-foundation) lib

See [apollo network](http://dev.apollodata.com/core/network.html)

## Install

`npm i -S @tecla5/apollo-conn`

## Usage

### Client configuration

```js
import {
  // ApolloConnector,
  createConnection
} from '@tecla5/apollo-conn'

import config from '../config'
const connection = createConnection(config, {
  ApolloClient
})
```

## Customization

You can extend `ApolloConnector` with your own custom configuration and provide a custom factory method `createConnector` on the config object as shown here:

```js
import {
  createConnector,
  ApolloConnector
} from '@tecla5/gql-apollo'

class MyGCAuthConnector extends ApolloConnector {
  // ...
  constructor(config) {
    super(config)
    // custom
  }
  // ...
}

function createConnection(config, opts) {
  return new MyGCAuthConnector(config, opts).connect()
}

import config from '../config'
const myClient = setup(config, {
  createConnection,
  // ...
})
```

## Config object

Use a configuration object of the following form

```js
export default {
  gqlServer: {
    connection: { // used by apollo/lokka connection configuration
      uri: 'xxx', // graphCool endpoint
      // ... more networkInterface config
    },
    endpoint: 'xxx', // graphCool endpoint
  },
  storage: { // localstorage
    gqlServerTokenKeyName: 'xxx' // key to store graphcoolToken
  }
}
```

## Babel compilation optimization

See [How to do proper tree-shaking in Webpack 2](https://blog.craftlab.hu/how-to-do-proper-tree-shaking-in-webpack-2-e27852af8b21)

## Tests

Tests are written and run using [ava](https://github.com/avajs/ava)

`$ npm test`

## License

MIT 2017 Tecla5, Kristian Mandrup
