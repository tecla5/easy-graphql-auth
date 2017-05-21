# GraphCool Auth0 Lokka

Integration library for GraphCool with Auth0 and Lokka.

Currently *WIP*

## Install

`npm i -S @tecla5/gc-auth0-lokka`

## Pre-requisites

On [Auth0 university](https://auth0.com/university/) watch:

- [Auth0 101 course](https://auth0.com/university/2/auth0-101)
- [Getting Started with the lock](https://auth0.com/university/3/getting-started-with-the-lock)

On [GraphCool youtube channel](https://www.youtube.com/channel/UCptAHlN1gdwD89tFM3ENb6w), watch the first 2 minutes of GraphCool  [User Authentication with Auth0 for React and Apollo](https://www.youtube.com/watch?v=5uxq8Om-AZQ) which demonstrates how to create an Auth0 client app and configure a GraphCool app for Auth0 integration.

Now you should be good to go!

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
