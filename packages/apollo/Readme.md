# GraphQL server integration with Lokka

Integration library for GraphQL server with Auth0 and Apollo

## Install

`npm i -S @tecla5/gql-auth0-apollo`

## Pre-requisites

On [Auth0 university](https://auth0.com/university/) watch:

- [Auth0 101 course](https://auth0.com/university/2/auth0-101)
- [Getting Started with the lock](https://auth0.com/university/3/getting-started-with-the-lock)

On [GraphCool youtube channel](https://www.youtube.com/channel/UCptAHlN1gdwD89tFM3ENb6w), watch the first 2 minutes of GraphCool  [User Authentication with Auth0 for React and Apollo](https://www.youtube.com/watch?v=5uxq8Om-AZQ) which demonstrates how to create an Auth0 client app and configure a GraphCool app for Auth0 integration.

Now you should be good to go!

## Usage

### Lock & client configuration

```js
import {
  createClient
} from '@tecla5/gc-auth0-apollo'
import {
  setup,
  createStore,
  createLock
} from '@tecla5/gc-auth0'
import config from '../config'
import Auth0Lock from 'auth0-lock'
config.Auth0Lock = Auth0Lock

let res = setup({
  createClient,
  createStore,
  createLock
}, config)

export default res.lock
```

Then configure UI event handler to display Auth0 lock modal popup and subscribe to authenticated event.

```js
$('#login').click(() => {
  lock
    .showLock()
    .subscribeAuthenticated()
})
```

You can then hook into the Auth0 event flow from your view components.
Example from React demo app:

```js
this.lock.on('signedIn', ({profile}) {
  this.setState({
    isLoggedIn: true,
    profile,
  })
}
```

## Customization

You can extend `GCAuth0Connector` with your own custom configuration and provide a custom factory method `createGCAuth0Connector` on the config object as shown here:

```js
const {
  client,
  GCAuth0Connector
} = require('@tecla5/gc-auth0-apollo')

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

## Babel compilation optimization

See [How to do proper tree-shaking in Webpack 2](https://blog.craftlab.hu/how-to-do-proper-tree-shaking-in-webpack-2-e27852af8b21)

## Tests

Tests are written and run using [ava](https://github.com/avajs/ava)

`$ npm test`

## License

MIT 2017 Tecla5, Kristian Mandrup
