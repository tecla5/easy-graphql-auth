# Lokka connect

Connect to GraphQL server via Lokka transport client

## Install

`npm i -S @tecla5/lokka-conn`

## Pre-requisites

On [Auth0 university](https://auth0.com/university/) watch:

- [Auth0 101 course](https://auth0.com/university/2/auth0-101)
- [Getting Started with the lock](https://auth0.com/university/3/getting-started-with-the-lock)

On [GraphCool youtube channel](https://www.youtube.com/channel/UCptAHlN1gdwD89tFM3ENb6w), watch the first 2 minutes of GraphCool  [User Authentication with Auth0 for React and Apollo](https://www.youtube.com/watch?v=5uxq8Om-AZQ) which demonstrates how to create an Auth0 client app and configure a GraphCool app for Auth0 integration.

Now you should be good to go!

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
} from '@tecla5/lokka-conn'
import config from './config'

let connection = createConnection(config, {
  Lokka,
  Transport
})
```

## Customization

You can extend `GCAuth0Connector` with your own custom configuration and provide a custom factory method `createGCAuth0Connector` on the config object as shown here:

```js
import {
  client,
  GCAuth0Connector
} from '@tecla5/gc-auth0-lokka'

class MyGCAuthConnector extends GCAuth0Connector {
  // ...
  constructor(config) {
    super(config)
  }
}

function createGCAuth0Connector(config) {
  return new MyGCAuthConnector(config).configure()
}

import config from '../config'
import Auth0Lock from 'auth0-lock'
config.Auth0Lock = Auth0Lock

config.createGCAuth0Connector = createGCAuth0Connector
const myClient = client(config)
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
