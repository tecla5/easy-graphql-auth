# Foundation for Application Auth with Auth0

Import `app-auth` module and use `AppAuth` to wrap the use of `lock` (from `easy-auth0-lock` module) in your client app.

## Exports

- `AppAuth` - class that can be extended and customized as needed
- `configureAppAuth` - use to configure app auth (see below)

You can sublclass `AppAuth` and then pass in your own `createAppAuth` factory method to customize as needed (see below)

## Usage

By default assumes jQuery-like API is available for document ready. It will also try `$` to select DOM elements and fall back to using `document.querySelector` if `$` is not defined. You can pass your own `ready` and `selectElement` functions.

```js
configureAppAuth(selectors, {
  ready,
  selectElement
})
```

### Defaults

- `createAppAuth` - factory method to create `AppAuth` instance
- `selectors` - see _Selectors_ section

### Selectors

You can pass a selectors object that point to the app elements used to trigger `login`, `logout` and `welcome` (display message or profile info when logged in)

```js
selectors: {
  login: '#login',
  logout: '#logout',
  welcome: '#welcome'
}
```

### Example use

Using defaults and native document ready, part of `appAuth`.

```js
const {
  configureAppAuth,
  onDocReady
} = appAuth

configureAppAuth({
  onDocReady
})
```

```js
class MyAppAuth extends AppAuth {
  // .. customization
}

function createAppAuth(config) {
  return new MyAppAuth(config)
}

configureAppAuth({
  createAppAuth,
  onDocReady
})
```
