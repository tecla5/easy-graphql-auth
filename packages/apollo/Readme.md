# GraphCool Auth0 Lokka

Integration library for GraphCool with Auth0 and Apollo

## Install

`npm i -S @graphcool/gc-auth0-apollo`

## Usage

Using default setup:

```js
const {
  client,
  GCAuth0Connector,
  // from gc-auth0-common
  Lock,
  createLock,
  jwtUtil
} = require('@graphcool/gc-auth0-apollo')

const config = require('./config')
const myClient = client(config)

const lock = createLock(config)
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
this.lock.signedInOk = ({profile}) {
  this.setState({
    isLoggedIn: true,
    profile,
  })
}
```

## Cusrtomization

You can extend `GCAuth0Connector` with your own custom configuration and provide a custom factory method `createGCAuth0Connector` on the config object as shown here:

```js
const {
  client,
  GCAuth0Connector
} = require('@graphcool/gc-auth0-apollo')

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

