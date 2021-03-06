# GraphCool React app with Auth0

Demo app showcasing `gc-auth0-apollo` and `gc-auth0-lokka` with React.

This project was bootstrapped with [Create React App](https://github.com/facebookincubator/create-react-app).

## Pre-requisites

On [Auth0 university](https://auth0.com/university/) watch:

- [Auth0 101 course](https://auth0.com/university/2/auth0-101)
- [Getting Started with the lock](https://auth0.com/university/3/getting-started-with-the-lock)

On [GraphCool youtube channel](https://www.youtube.com/channel/UCptAHlN1gdwD89tFM3ENb6w), watch the first 2 minutes of GraphCool  [User Authentication with Auth0 for React and Apollo](https://www.youtube.com/watch?v=5uxq8Om-AZQ) which demonstrates how to create an Auth0 client app and configure a GraphCool app for Auth0 integration.

Now you should be good to go!

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
import {
  createConnection
} from '@tecla5/apollo-conn'
import {
  setup,
  createStore,
  createLock
} from '@tecla5/easy-auth0-lock'
import config from '../config'
import Auth0Lock from 'auth0-lock'

export default setup(config, {
  Auth0Lock,
  createConnection,
  createStore,
  createLock
})
```

To replace GraphQL client with `lokka`, simply replace the imported lib.

`const { ... } = require('@tecla5/lokka-auth')`

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
    authTokenKeyName: 'xxx', // key to store auth0IdToken
  },
  auth0: { // from auth0 client app settings
    domain: 'xxx', // Your auth0 domain
    clientId: 'xxx' // // Your auth0 client id
  }
}
```

## License

MIT - [Tecla5](http://tecla5.com) 2017, Kristian Mandrup
