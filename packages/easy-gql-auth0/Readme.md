# Easy GraphQL Authentication with Auth0

Makes it super quick and easy to setup a full authentication flow for a GraphQL server with [Auth0](https://auth0.com)

<img src="https://github.com/tecla5/easy-graphql-auth/raw/master/pics/Auth0-GraphQL-Flow.png" alt="Auth0 GraphQL Auth flow" width="50%" height="50%">

## Install

`npm i -S @tecla5/easy-gql-auth0`

## Usage

```js
import ApolloClient, {
  createNetworkInterface
} from 'apollo-client'

import {
  createConnection
} from '@tecla5/apollo-auth-conn'

import {
  createLock
} from '@tecla5/easy-gql-auth0'

import config from './config'

import {
  GraphQLAuth
} from '@tecla5/gql-auth'

const client = {
  Client,
  createNetworkInterface,
  createConnection
}

let lock = createLock(config, {
  // serverSignin,
  // GraphQLAuth
  ServerAuth: GraphQLAuth,
  client
})
```

### Server signin

`createLock` will add a default `serverSignin` method to lock that will be called on successful Auth0 login.

#### Customized server signin

You can pass your own custom `serverSignin` method or simply pass a `ServerAuth` (or `GraphQLAuth`) option which will be assumed to be a class (or constructor function).
This will then be used to instantiate a `ServerAuth` (server signin) instance.

```js
  async function serverSignin(authResult) {
    this.gqlAuth = new ServerAuth(this.config, this.opts)
    let result = await this.signin(authResult)
    return result
  }
```

Note: The `serverSignin` method will have `this` bound to the lock instance.

## Ui config

```js
lock.on('signedIn', loggedIn)
lock.on('loggedOut', loggedOut)

login() {
  // login
  lock
    .showLock()
    .subscribeAuthenticated()
}

logout() {
  // logout
  lock
    .logout()
}
```

## Sample demo app

The `index.html` seeks to demonstrate how to use this lib in a simple app

## License

MIT - [Tecla5](http://tecla5.com) 2017, Kristian Mandrup
