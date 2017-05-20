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

    this.lock.signedInOk = ({profile}) => {
      this.setState({
        isLoggedIn: true,
        profile,
      })
    }
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

Lock configuration is also super simple.

```js
const {
  client,
  GCAuth0Connector,
  // from gc-auth0-common
  Lock,
  createLock,
  jwtUtil
} = require('@graphcool/gc-auth0-apollo')

const config = require('../config')
const myClient = client(config)

const lock = createLock(config)

module.exports = lock
```

To replace client with lokka, simply replace the imported lib.

`const { ... } = require('@graphcool/gc-auth0-apollo')`