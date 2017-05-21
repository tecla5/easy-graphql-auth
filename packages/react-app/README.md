# GraphCool React app with Auth0

Demo app showcasing `gc-auth0-apollo` and `gc-auth0-lokka` with React.

This project was bootstrapped with [Create React App](https://github.com/facebookincubator/create-react-app).

## GraphCool and Auth0

With `gc-auth0` it becomes a breeze to enrich a React component with Auth0 authentication.

```js
import React, { Component } from 'react';
import lock from './auth0/lock';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {isLoggedIn: false};
    this.doLogin = this.doLogin.bind(this);
    this.doLogout = this.doLogout.bind(this);

    lock.on('signedIn', this.loggedIn)
    lock.on('loggedOut', this.loggedOut)
  }

  loggedOut() {
    this.setState({
      isLoggedIn: false,
      profile: {}
    })
    // hide logout button
  }

  signedIn({
    profile
  }) {
    this.setState({
      isLoggedIn: true,
      profile,
    })
    // hide login button
  }

  doLogin() {
    lock
      .showLock()
      .subscribeAuthenticated()
  }

  doLogout() {
    lock
      .logout()
  }

  render() {
    return `...`
  }
```

Lock configuration is also pretty simple.

```js
const {
  setup
} = require('@tecla5/gc-auth0-apollo')
const config = require('../config')
module.exports = setup(config)
```

You can also fine-tune the setup...

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

To replace GraphQL client with `lokka`, simply replace the imported lib.

`const { ... } = require('@tecla5/gc-auth0-apollo')`

Both clients implement the exact same interface :)

### Config

GraphCool configuration

```js
module.exports = {
  graphCool: {
    connection: { // used by apollo
      uri: 'xxx'
    },
    endpoint: 'xxx' // Your graphcool simple api endpoint url goes here
  },
  storage: {
    graphcoolTokenKeyName: 'xxx' // key to store graphcoolToken
  }
}
```

Auth0 configuration

```js
module.exports = {
  storage: { // localstorage
    auth0IdTokenKeyName: 'xxx', // key to store auth0IdToken
  },
  auth0: { // from auth0 client app settings
    domain: 'xxx', // Your auth0 domain
    clientId: 'xxx' // // Your auth0 client id
  }
}
```

## License

MIT 2017 Tecla5, Kristian Mandrup
