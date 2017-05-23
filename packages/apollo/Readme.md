# GraphQL server integration with Lokka

Integration library for GraphQL server with Apollo

## Install

`npm i -S @tecla5/gql-apollo`

## Usage

### Client configuration

```js
import {
  apolloSetup
} from '@tecla5/gc-auth0-apollo'

import config from '../config'
const client = apolloSetup(config)
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

function createMyConnector(config) {
  return new MyGCAuthConnector(config).configure()
}

import config from '../config'
config.createConnector = createMyConnector
const myClient = apolloSetup(config)
```

## Config object

Use a configuration object of the following form

```js
export default {
  gqlServer: {
    connection: { // used by apollo/lokka connection configuration
      uri: 'xxx', // graphCool endpoint
      // ... more networkInterface config
    }
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
