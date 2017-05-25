# Easy GraphQL Authentication

Makes it super quick and easy to setup authentication for a GraphQL server with Auth0.

## Install

`npm i -S @tecla5/easy-gql-auth`

## Usage

```js
import {
  createConnection
} from '@tecla5/apollo-conn'
let lock = createLock(config, {
  createConnection
})

// login
lock
  .showLock()
  .subscribeAuthenticated()

// logout
lock
  .logout()
```

## License

MIT Tecla5 2017