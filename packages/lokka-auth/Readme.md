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
  return new MyAuthConnection(config).connect()
}
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
    endpoint: 'xxx' // Your graphcool simple api endpoint url goes here
  },
  storage: { // localstorage
    gqlTokenKeyName: 'xxx' // key to store graphcoolToken
  }
}
```

### Methods and Customization options


### connect

`connect(token)` creates the initial connection

The `authToken` is expected to be received from the GraphQL server and stored in localStorage on a successful signin with an auth provider.

The default strategy is to create a new `headers` with the Authorization `Bearer` set to the token found in the store (if present) or the incoming token. If there is no `authToken` the default headers are used.

```js
`'Authorization': `Bearer ${authToken}`
```

Then a new Lokka `Transport` instance is created with this headers enabled for subsequent requests to be authenticated via JWT.

### setJwtToken

- `setJwtToken(signinToken)` used to set JWT token on HTTP header

Calls `connect` with the `signinToken` from the GraphQL server

## Tests

Tests are written and run using [ava](https://github.com/avajs/ava)

`$ npm test`

## License

MIT 2017 Tecla5, Kristian Mandrup
