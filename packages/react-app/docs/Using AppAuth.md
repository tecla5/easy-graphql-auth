## React with Auth0 using AppAuth

With `AppAuth` it becomes a breeze to enrich a React component with Auth0 authentication.

```js
import React, { Component } from 'react';
import lock from './auth0/lock';
import { configureAppAuth } from '@tecla5/app-auth'

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {isLoggedIn: false};

    this.appAuth = configureAppAuth(lock, {
      onSignedOut: this.onSignedOut,
      onSignedIn: this.onSignedIn,
      ctx: this // pass self as context
    })
  }

  onSignedOut() {
    this.setState({
      isLoggedIn: false,
      profile: {}
    })
    // hide logout button
    this.appAuth.onSignedOut()
  }

  onSignedIn({
    profile
  }) {
    this.setState({
      isLoggedIn: true,
      profile,
    })
    // hide login button
    this.appAuth.onSignedIn()
  }

  render() {
    return `...`
  }
}
```
