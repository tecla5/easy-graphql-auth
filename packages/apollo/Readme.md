# GraphCool Auth0 Lokka

Integration library for GraphCool with Auth0 and Apollo

## Install

`npm i -S @tecla5/gc-auth0-apollo`

## Usage

### Lock & client configuration

```js
const {
  createClient,
  GCAuth0Connector,
  // from gc-auth0-common
  Lock,
  createLock,
  jwtUtil,
  Store,
  createStore
} = require('@tecla5/gc-auth0-apollo')

const config = require('../config')
config.store = createStore(config.storage)
const lock = createLock(config)
const client = createClient(config)

module.exports = {
  lock,
  client
}
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

const config = require('./config)
config.createGCAuth0Connector = createGCAuth0Connector
const myClient = client(config)
```

## Config object

Use a configuration object of the following form

```js
module.exports = {
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
