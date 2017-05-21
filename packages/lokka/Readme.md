# GraphCool Auth0 Lokka

Integration library for GraphCool with Auth0 and Lokka.

Currently *WIP*

## Install

`npm i -S @tecla5/gc-auth0-lokka`

## Usage

Using default setup:

```js
const {
  createClient,
  GCAuth0Connector
} = require('@tecla5/gc-auth0-lokka')

const config = require('./config')
const myClient = createClient(config)
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

## Customization

You can extend `GCAuth0Connector` with your own custom configuration and provide a custom factory method `createGCAuth0Connector` on the config object as shown here:

```js
const {
  client,
  GCAuth0Connector
} = require('@tecla5/gc-auth0-lokka')

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
