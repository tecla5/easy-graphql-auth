# Easy GraphQL Authentication with Auth0

Makes it super quick and easy to setup a full authentication flow for a GraphQL server with [Auth0](https://auth0.com)

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

## License

MIT - [Tecla5](http://tecla5.com) 2017, Kristian Mandrup