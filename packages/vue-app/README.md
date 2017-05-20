# vue-app

> Vue2 with GraphCool and Auth0

Demo app showcasing `gc-auth0-apollo` and `gc-auth0-lokka` with Vue 2.

## Design

Basic Auth0 event and state flow:

```js
import { lock } from '../auth0/lock'

export default {
  name: 'app',
  methods: {
    doLogin() {
      lock
        .showLock()
        .subscribeAuthenticated()
    },
    doLogout() {
      lock
        .logout()
    }
  },
  created: function () {
    lock.signedInOk = function ({ profile }) {
      this.isLoggedIn = true;
      this.profile = profile;
      // hide login button
    }

    lock.loggedOut = function () {
      this.isLoggedIn = false;
      this.profile = {};
      // hide logout button
    }
  }
}
```

### Lock & client configuration

```js
const {
  setup
} = require('@graphcool/gc-auth0-apollo')
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
} = require('@graphcool/gc-auth0-apollo')

const config = require('../config')
config.store = createStore(config.storage)
const lock = createLock(config)
const client = createClient(config)

module.exports = {
  lock,
  client
}
```

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

## Commands

You can replace `yarn` with `npm run` here.

```bash
# build for production
yarn build

# development mode
yarn dev

# serve the bundled dist folder in production mode
yarn serve
```


## Progress Web App

Your app is now offline-ready (only in production bundle), which means you can visit it without network.

Here we use a default [manifest.json](./static/manifest.json) to configurure your pwa, for example, to enable [Add to Home Screen] feature on Android. It will be copied directly to `./dist/manifest.json`.


For all the available options, please head to [poi-preset-offline](https://github.com/egoist/poi/tree/master/packages/poi-preset-offline#api).

---

This project is generated from [template-vue](https://github.com/egoist/template-vue).
