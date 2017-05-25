# Lokka Auth

Auth library for connecting to GraphQL server with Lokka using [easy-gql-auth](https://github.com/tecla5/easy-gql-auth) lib

## Install

`npm i -S @tecla5/lokka-auth`

## Usage

Using default setup:

```js
import {
  Lokka
} from 'lokka'
import {
  Transport
} from 'lokka-transport-http'

import {
  createConnection
} from '@tecla5/lokka-auth'
import config from './config'

let connection = createConnection(config, {
  Lokka,
  Transport
})
```

## Customization

You can extend `LokkaAuthConnection` with your own custom configuration and provide a custom factory method `createConnection` on the config object as shown here:

```js
import {
  client,
  GCAuth0Connector
} from '@tecla5/gc-auth0-lokka'

class MyAuthConnection extends LokkaAuthConnection {
  // ...
  constructor(config) {
    super(config)
  }
}

function createConnection(config) {
  return new MyAuthConnection(config).configure()
}
```


## Config object

Use a configuration object of the following form

```js
export default {
  graphCool: {
    connection: { // used by apollo/lokka connection configuration
      uri: 'xxx', // graphCool endpoint
      // ... more networkInterface config
    },
    endpoint: 'xxx' // Your graphcool simple api endpoint url goes here
  },
  storage: { // localstorage
    auth0IdTokenKeyName: 'xxx', // key to store auth0IdToken
    graphcoolTokenKeyName: 'xxx' // key to store graphcoolToken
  },
  auth0: { // from auth0 client app settings
    domain: 'xxx', // Your auth0 domain
    clientId: 'xxx' // // Your auth0 client id
  }
}
```

## Tests

Tests are written and run using [ava](https://github.com/avajs/ava)

`$ npm test`

## License

MIT 2017 Tecla5, Kristian Mandrup
