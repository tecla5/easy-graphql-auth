# Auth0 integration libs for GraphQL clients and servers

Makes it quick and easy to setup GraphQL servers such as [GraphCool](https://www.graph.cool) with [Auth0](https://auth0.com/) and *GraphQL* clients, such as:

- [apollo](https://github.com/apollographql)
- [lokka](https://github.com/kadirahq/lokka)

See the docs for each of the modules included for more details including installation and usage. Enjoy!!

These libs can be used in combination with the recently updated tutorial project [micro-stripe-example](https://github.com/tecla5/micro-stripe-example) for payments.

Coming soon: *Stripe subscription payments integration*

## Modules

- `@tecla5/token-foundation` - token storage and common utilities

### GraphQL auth

- `@tecla5/easy-gql-auth` - Easy GraphQL authentication
- `@tecla5/apollo-auth` - connect to GraphQL server via Apollo
- `@tecla5/lokka-auth` - connect to GraphQL server via Lokka

### Auth0 Lock

- `@tecla5/easy-gql-auth0` - Easy GraphQL authentication with Auth0
- `@tecla5/easy-auth0-lock` - Easy Auth0 Lock usage

## Demo apps

- `jquery-app`
- `react-app`
- `vue-app`

Please add one for your framework of choice ;)

## Setup

A typical configuration would look as follows:

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
config.Auth0Lock = Auth0Lock

export default setup({
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
