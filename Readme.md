# Auth0 integration libs for GraphQL clients and servers

Makes it quick and easy to setup GraphQL servers such as [GraphCool](https://www.graph.cool) with [Auth0](https://auth0.com/) and *GraphQL* clients, such as:

- [apollo](https://github.com/apollographql)
- [lokka](https://github.com/kadirahq/lokka)

See the docs for each of the modules included for more details including installation and usage. Enjoy!!

These libs can be used in combination with the recently updated tutorial project [micro-stripe-example](https://github.com/tecla5/micro-stripe-example) for payments.

Coming soon: *Stripe subscription payments integration*

## Modules

- `@tecla5/token-foundation` - token storage and common utilities

### GraphQL connection

- `@tecla5/gql-conn` - GraphQL server connection config and token store
- `@tecla5/apollo-conn` - connect to GraphQL server via Apollo
- `@tecla5/lokka-conn` - connect to GraphQL server via Lokka

Each GraphQL connection should have the capability to:

- perform GraphQL queries via `async doQuery(query)`
- add JWT token to connection via `setJWTtoken({signinToken})`

### GraphQL auth

- `@tecla5/gql-auth` - GraphQL authentication
- `@tecla5/easy-gql-auth` - Efficient setup of GraphQL authentication flow

Note that `easy-gql-auth` is designed to work well with *auth0* but can be configuted to support alternative auth providers

### Auth0

- `@tecla5/easy-auth0-lock` - Efficient setup of GraphQL authentication with Auth0 Lock

`easy-auth0-lock` can be made to work with various Auth0 authentication systems beyond *Lock*, including [passwordless](https://auth0.com/passwordless) with [magic link email](https://auth0.com/docs/connections/passwordless/email) or [sms](https://auth0.com/docs/connections/passwordless/sms).

Notably a `setup` method is included which should facilitate full setup of all the pieces for a full 2-phase Auth provider signin and GraphQL signin flow with all the "bells and whistles".

## Demo apps

- `jquery-app`
- `react-app`
- `vue-app`

The demo apps serve to illustrate how to leverage the `easy-auth0-lock` lib so easily, that there is very little difference in the setup, as the library has been designed to be completely self-contained and makes no assumptions on the consumer. Example can be found below.

Please add a demo app for your framework of choice ;)

## Setup

A typical configuration could look as follows:

```js
import Auth0Lock from 'auth0-lock'
import {
  createGraphQLAuth
} from '@tecla5/gql-auth'
import {
  createConnection
} from '@tecla5/apollo-auth'
import {
  setup,
  createStore,
  createLock
} from '@tecla5/easy-auth0-lock'

import config from '../config'

export default setup({
  Auth0Lock,
  createGraphQLAuth,
  createConnection,
  createStore,
  createLock
}, config)
```

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

## License

MIT 2017 Tecla5, Kristian Mandrup
