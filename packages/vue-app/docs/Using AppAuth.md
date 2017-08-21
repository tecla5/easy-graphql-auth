## React with Auth0 using AppAuth

With `AppAuth` it becomes a breeze to enrich a React component with Auth0 authentication.

```js
// assuming easy-auth0-lock instance exported
import lock from './auth0/lock';
import { configureAppAuth } from '@tecla5/app-auth'

export default {
  name: 'app',
  data: function () {
    // TODO: display in template
    return {
      isLoggedIn: false,
      profile: {}
    }
  },
  methods: {
    onSignedIn: ({ profile }) => {
      component.isLoggedIn = true;
      component.profile = profile;
      // hide login button, show welcome + logout
      this.appAuth.onSignedIn()
    },
    onSignedOut: () => {
      component.isLoggedIn = false;
      component.profile = {};
      // hide logout button + welcome, show login
      this.appAuth.onSignedOut()
    }
  },
  created: function () {
    this.appAuth = configureAppAuth(lock, {
      onSignedOut: this.onSignedOut,
      onSignedIn: this.onSignedIn,
      ctx: this // pass self as context
    })
  }
}
```
