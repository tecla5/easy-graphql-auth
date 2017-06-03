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