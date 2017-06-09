# Auth libs for GraphQL client/server

Attempts to make it much easier to setup GraphQL servers with [Auth0](https://auth0.com/) (and other Auth providers) via GraphQL clients, such as:

- [apollo](http://dev.apollodata.com/)
- [lokka](https://github.com/kadirahq/lokka)

Designed specifically for [GraphCool](https://www.graph.cool) (SaaS) server but well suited for any other GraphQL server.

See the docs for each of the modules included for more details including installation and usage.

## Lerna

Looks like lerna is broken with npm 5. Please use Node 7.x and npm 4.x

```bash
npm install --save-dev npm@4.6.1
```

Set `npmClient` to `node_modules/.bin/npm` in your `lerna.json`

### Setup

Recommended global npm binaries/utils:

- [lerna](https://www.npmjs.com/package/lerna) - mono repo package manager
- [ava](https://www.npmjs.com/package/ava) - futuristic test runner (promises/parallel)
- [nyc](https://www.npmjs.com/package/nyc) - Istanbul test coverage
- [webpack](https://www.npmjs.com/package/webpack) - Babel compiler/loader
- [ncu](https://www.npmjs.com/package/npm-check-updates) - check npm module updates
- [now](https://www.npmjs.com/package/now) - simple micro services

`npm -g lerna ava nyc webpack ncu now`

## Modules included

This project consists of the following modules:

- `@tecla5/token-foundation`
- `@tecla5/gql-conn`
- `@tecla5/apollo-auth-conn`
- `@tecla5/lokka-auth-conn`
- `@tecla5/gql-auth`
- `@tecla5/easy-auth0-lock`
- `@tecla5/easy-gql-auth0`

And the following demo apps:

- `jquery-app`
- `react-app`
- `vue-app`

### Base config/token functionality

- `@tecla5/token-foundation` - token storage and common utilities

<img src="https://github.com/tecla5/easy-graphql-auth/raw/master/pics/token-foundation.png" alt="GraphQL Auth" width="25%" height="25%">

### GraphQL client (auth) connection

- `@tecla5/gql-conn` - GraphQL server connection config and token store
- `@tecla5/apollo-auth-conn` -  GraphQL server connection via Apollo (built on `gql-conn`)
- `@tecla5/lokka-auth-conn` - GraphQL server connection via Lokka (built on `gql-conn`)

<img src="https://github.com/tecla5/easy-graphql-auth/raw/master/pics/GraphQL-client-auth.png" alt="GraphQL Auth" width="50%" height="50%">

Each GraphQL connection should have the capability to:

- perform GraphQL queries via `async doQuery(query)`
- add JWT token to connection via `setJWTtoken(signinToken)`

### GraphQL auth flow

- `@tecla5/gql-auth` - GraphQL authentication

<img src="https://github.com/tecla5/easy-graphql-auth/raw/master/pics/GraphQL-Auth.png" alt="GraphQL Auth" width="50%" height="50%">

### Auth0 login (UI)

- `@tecla5/easy-auth0-lock` - Efficient setup of GraphQL authentication with Auth0 Lock

<img src="https://github.com/tecla5/easy-graphql-auth/raw/master/pics/Auth0-Lock-Provider.png" alt="Auth0 Lock" width="40%" height="40%">

`easy-gql-auth0` is designed to work well with *auth0* but can be configuted to support alternative auth providers

`easy-auth0-lock` can be made to work with various Auth0 authentication systems beyond *Lock*, including [passwordless](https://auth0.com/passwordless) with [magic link email](https://auth0.com/docs/connections/passwordless/email) or [sms](https://auth0.com/docs/connections/passwordless/sms).

## Full 2-phase auth flow

- `@tecla5/easy-gql-auth0` - Efficient setup of full Auth0 and GraphQL authentication flow

<img src="https://github.com/tecla5/easy-graphql-auth/raw/master/pics/Auth0-GraphQL-Flow.png" alt="Full auth0 graphQL flow" width="80%" height="80%">

Notably a `setup` method is included which should facilitate full setup of all the pieces for a full 2-phase Auth provider signin and GraphQL signin flow with all the "bells and whistles".

## Demo apps

- `jquery-app`
- `react-app`
- `vue-app`

The demo apps serve to illustrate how to leverage the `easy-auth0-lock` lib so easily, that there is very little difference in the setup, as the library has been designed to be completely self-contained and makes no assumptions on the consumer. Example can be found below.

Please add a demo app for your framework of choice ;)

## Auth0 Lock setup

A typical configuration could look as follows:

```js
import {
  createGraphQLAuth
} from '@tecla5/gql-auth'

import ApolloClient, {
  createNetworkInterface
} from 'apollo-client'

import {
  createConnection
} from '@tecla5/apollo-auth-conn'

const client = {
  ApolloClient,
  createNetworkInterface,
  createConnection,
}

import Auth0Lock from 'auth0-lock'
import {
  setup,
  createStore,
  createLock
} from '@tecla5/easy-auth0-lock'

const lockConfig = {
  Auth0Lock,
  createLock
}

import config from './config'

export default setup(config, {
  createGraphQLAuth, // adds graphQL auth
  createStore,

  client,
  lockConfig,
})
```

Using `easy-gql-auth0` we can achieve the same with a somewhat simpler configuration, using conventions:

```js
import ApolloClient, {
  createNetworkInterface
} from 'apollo-client'

import {
  createConnection
} from '@tecla5/apollo-auth-conn'

let client = {
  ApolloClient,
  createNetworkInterface,
  createConnection
}

import {
  createLock
} from 'easy-gql-auth0'

import config from './config'

let lock = createLock(config, {
  client
})
```

## UI setup

A typical user session component with signin & logout

```js
class SessionComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoggedIn: false
    };

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

  // ...
  // have the component render trigger doLogin and doLogout
}
```

## Pre-requisites

On [Auth0 university](https://auth0.com/university/) watch:

- [Auth0 101 course](https://auth0.com/university/2/auth0-101)
- [Getting Started with the lock](https://auth0.com/university/3/getting-started-with-the-lock)

On [GraphCool youtube channel](https://www.youtube.com/channel/UCptAHlN1gdwD89tFM3ENb6w), watch the first 2 minutes of GraphCool  [User Authentication with Auth0 for React and Apollo](https://www.youtube.com/watch?v=5uxq8Om-AZQ) which demonstrates how to create an Auth0 client app and configure a GraphCool app for Auth0 integration.

Now you should be good to go!

## Development

This is a [lerna](https://lernajs.io/) project. So simply bootstrap.

`$ lerna bootstrap`

And you will be good to go!

## Build

Build all modules (or use with lerna `--scope`)

- `$ lerna run build:dev` - for dev
- `$ lerna run build:prod` - for prod (minified)

Only for specific module via `--scope`

- `$ lerna run build:prod --scope @tecla5/token-foundation`

In local module/project

- `$ npm run build:dev` - for dev
- `$ npm run build:prod` - for prod (minified)

## Test

`$ lerna run test`

In local module/project

`$ npm test`

Run specific test

`$ ava test/auth.test.js`

### Code coverage

See [Ava Code coverage](https://github.com/avajs/ava/blob/master/docs/recipes/code-coverage.md) recipe

Install NYC globally

`npm i -g nyc`

## Publish to npm

`$ lerna publish`

## Payments

These auth libs can be used in combination with the recently updated tutorial project [micro-stripe-example](https://github.com/tecla5/micro-stripe-example) for payments.

Coming soon: *Stripe subscription payments integration* (separate project)

The goal is to supply efficient infrastructure to build the core functionality for most sites:

- user signup
- payment (including subscriptions)

Stay tuned...

## License

MIT - [Tecla5](http://tecla5.com) 2017, Kristian Mandrup
