# Http auth connection

Http auth client connection settings and token store configuration.
Useful as baseclass for HTTP auth connection middleware (such as for `easy-auth0-lock`)

## Install

`npm i -S @tecla5/http-auth-conn`

## Dependencies

- [@tecla5/token-foundation](https://github.com/tecla5/token-foundation)

Extends `Configurable` class, which provides basic configuration functionality, token store, logging and pub/sub.

## Usage

Can be used as base functionality for any library that wants to connect to a Http server and use a token store, such as for authentication purposes.

This lib is designed to be used by:

- [easy-auth0-lock](https://github.com/tecla5/easy-gql-auth0/packages/easy-auth0-lock)

## Included

- `HttpConnection` class, a Http server base class to be extended
- `FetchAuthConnection`
- `AjaxAuthConnection`

## HttpConnection class

The constructur calls `validateConnection` which by default validates if `store` and `keyNames` are defined for auth to retrieve the auth token.

You can override this behavior for a custom auth token strategy if needed.

### Validation

- `validateConnection` validates that connection settings are valid

### Getters

- `authTokenKeyName` the key name used to store the auth token
- `authToken` get the auth token from the store if present

### setJwtToken

- `setJwtToken({signinToken})` used to set JWT token on HTTP header

The `signinToken` is received from the Http server on a successful signin with an auth provider.

### Environment variables

Set the following environment variables and you should be good to go...

- `server_tokenKeyName`

## AjaxAuthConn

The default ajax auth implementation is designed for use with [jQuery Ajax](http://api.jquery.com/jquery.ajax/). Simply pass `$` (jQuery instance) as the `client`.

```js
let conn = createConnection({
  client: $
})
```

### Customization

`AjaxAuthConn` class can be customized for any Ajax library. The key is to customize `prepareQuery` to always set the Authorization header with the JWT token before making the request.

```js
prepareQuery(query, opts = {}) {
  let preparedQuery = Object.assign({}, query, {
    // assumes jQuery Ajax is used
    beforeSend: function (xhr) {
      //Include the bearer token in header
      xhr.setRequestHeader('Authorization', 'Bearer ' + this.authToken);
    }
  })

  return preparedQuery
}
```

First `extend` the `AjaxAuthConn` class and implement a custom `prepareQuery` method:

```js
class CustomAjaxAuthConn extends AjaxAuthConn {
  constructor(config = {}, opts = {}) {
    super(config, opts)
    this.name = 'CustomAjaxAuthConn'
  }

  prepareQuery(query, opts = {}) {
    let preparedQuery = Object.assign({}, query, {
      // enrich query with Authorization header:
      // 'Bearer ' + this.authToken
    })
  }
}
```

Pass a `client` option in the constructor when creating the ajax auth instance:

```js
ajaxAuthConn = new CustomAjaxAuthConn({
  client: myAjaxClient
  // ... other configurations
}, {
  // options
  logging: true
})
```

The `client` object must have an `ajax` method which takes and uses a query object to make the ajax call to the server. The `ajax` method must return a `Promise`.

You can wrap whatever ajax library you are using to fit these contraints.

### Custom Fetch auth

For Fetch, extend `FetchAuthConn`. The `prepareQuery` expects the client to implement a `headers` method, which takes the Authentication header (with bearer token) and returns the full `headers` to be used as the base for all queries.

```js
prepareQuery(query, opts = {}) {
  let preparedQuery = Object.assign({}, query, {
    // assumes jQuery Ajax is used
    headers: this.client.headers(this.authHeader, opts)
  })
  return preparedQuery
}
```

In `async doQuery(query)`, the method `fetch(query)` is called on the client. In other words, the `client` must implement `async fetch(query)` that makes the Fetch API call with the (prepared) query.

```js
async doQuery(query, opts = {}) {
  /// ...
  return await this.client.fetch(query)
}
```

## Tests

Tests are written and run using [ava](https://github.com/avajs/ava)

`$ npm test`

To mock `localStorage` for unit testing in node env:

```js
global.window = {}
import localStorage from 'mock-local-storage'
window.localStorage = global.localStorage
```

### Test coverage

```bash
$ nyc ava test/connection.test.js
...
1..1
# tests 1
# pass 1
# fail 0

-------------------|----------|----------|----------|----------|----------------|
File               |  % Stmts | % Branch |  % Funcs |  % Lines |Uncovered Lines |
-------------------|----------|----------|----------|----------|----------------|
All files          |    82.76 |       60 |      100 |    80.77 |                |
 http-conn.js      |    82.76 |       60 |      100 |    80.77 | 35,39,45,48,49 |
-------------------|----------|----------|----------|----------|----------------|
```

## License

MIT - [Tecla5](http://tecla5.com) 2017, Kristian Mandrup
