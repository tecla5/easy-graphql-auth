# Auth libs for GraphQL client/server

Attempts to make it much easier to setup GraphQL servers with [Auth0](https://auth0.com/) (and other Auth providers) via GraphQL clients, such as:

- [apollo](https://github.com/apollographql)
- [lokka](https://github.com/kadirahq/lokka)

Designed specifically for [GraphCool](https://www.graph.cool) (SaaS) server but well suited for any other GraphQL server.

See the docs for each of the modules included for more details including installation and usage. Enjoy!!

## Modules included

### Base config/token functionality

- `@tecla5/token-foundation` - token storage and common utilities

### GraphQL client connection

- `@tecla5/gql-conn` - GraphQL server connection config and token store

### GraphQL client auth connection

- `@tecla5/apollo-auth-conn` -  GraphQL server connection via Apollo (built on `gql-conn`)
- `@tecla5/lokka-auth-conn` - GraphQL server connection via Lokka (built on `gql-conn`)

Each GraphQL connection should have the capability to:

- perform GraphQL queries via `async doQuery(query)`
- add JWT token to connection via `setJWTtoken(signinToken)`

### GraphQL auth flow

- `@tecla5/gql-auth` - GraphQL authentication

### Auth0 login (UI)

- `@tecla5/easy-auth0-lock` - Efficient setup of GraphQL authentication with Auth0 Lock

<img src="https://github.com/tecla5/easy-graphql-auth/raw/master/pics/auth0-lock-ui.png" alt="Auth0 Lock" width="50%" height="100%">

`easy-gql-auth0` is designed to work well with *auth0* but can be configuted to support alternative auth providers

`easy-auth0-lock` can be made to work with various Auth0 authentication systems beyond *Lock*, including [passwordless](https://auth0.com/passwordless) with [magic link email](https://auth0.com/docs/connections/passwordless/email) or [sms](https://auth0.com/docs/connections/passwordless/sms).

Notably a `setup` method is included which should facilitate full setup of all the pieces for a full 2-phase Auth provider signin and GraphQL signin flow with all the "bells and whistles".

## Full 2-phase auth flow

- `@tecla5/easy-gql-auth0` - Efficient setup of full Auth0 and GraphQL authentication flow

<img src="https://github.com/tecla5/easy-graphql-auth/raw/master/pics/Auth0-GraphQL-Flow-v3.png" alt="Full auth0 graphQL flow" width="100%" height="100%">

## Demo apps

- `jquery-app`
- `react-app`
- `vue-app`

The demo apps serve to illustrate how to leverage the `easy-auth0-lock` lib so easily, that there is very little difference in the setup, as the library has been designed to be completely self-contained and makes no assumptions on the consumer. Example can be found below.

Please add a demo app for your framework of choice ;)

## Auth0 Lock setup

A typical configuration could look as follows:

```js
import Auth0Lock from 'auth0-lock'
import {
  createGraphQLAuth
} from '@tecla5/gql-auth'

import ApolloClient, {
  createNetworkInterface
} from 'apollo-client'

import {
  createConnection
} from '@tecla5/apollo-auth-conn'

import {
  setup,
  createStore,
  createLock
} from '@tecla5/easy-auth0-lock'

import config from '../config'

export default setup(config, {
  Auth0Lock,
  createGraphQLAuth, // adds graphQL auth

  ApolloClient,
  createNetworkInterface,
  createConnection,

  createStore,
  createLock
})
```

Using `easy-gql-auth0` we can achieve the same with a much simpler configuration, using conventions:

```js
import ApolloClient, {
  createNetworkInterface
} from 'apollo-client'

import {
  createConnection
} from '@tecla5/apollo-conn'

import {
  createLock
} from 'easy-gql-auth0'

import config from './config'

let lock = createLock(config, {
  ApolloClient,
  createNetworkInterface,
  createConnection
})
```

## UI setup

A typical session component with signin & logout

```js
class App extends Component {
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

`$ lerna run build:dev` - for dev

`$ lerna run build:dev` - for prod (minified)

## Test

`$ lerna run test`

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

MIT 2017 Tecla5, Kristian Mandrup
