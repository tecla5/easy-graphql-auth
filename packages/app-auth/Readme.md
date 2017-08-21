# Foundation for Application Auth with Auth0

Import `app-auth` module and use `AppAuth` to wrap the use of `lock` (from `easy-auth0-lock` module) in your client app.

## Exports

- `AppAuth` - class that can be extended and customized as needed
- `configureAppAuth` - use to configure app auth (see below)

You can sublclass `AppAuth` and then pass in your own `createAppAuth` factory method to customize as needed (see below)

## Usage

`AppAuth` will try using `$` (if defined) to select DOM elements but fall back to using native `document.querySelector`. You can pass your own `ready` and `selectElement` functions to override defaults. To hide and show elements,

You must pass a `lock` instance (from `easy-auth0-lock` package) as the first (required) argument.

Using all defaults

```js
configureAppAuth(lock)
```

With configuration

```js
const config = {
  onReady,
  selectElement,
  // elements, // pre-selected
  selectors
}
configureAppAuth(lock, config)
```

### Defaults

- `onReady` - jquery `$(document).ready` or native equivalent
- `createAppAuth` - factory method to create `AppAuth` instance
- `selectors` - see _Selectors_ section

### Selectors

You can pass a selectors object that point to the app elements used to trigger `login`, `logout` and `welcome` (display message or profile info when logged in)

Default DOM element selectors

```js
selectors: {
  login: '#login',
  logout: '#logout',
  welcome: '#welcome'
}
```

You can also pass any of the (pre-selected) DOM elements directly in an `elements` object.
`AppAuth` will use an element from `elements` and fall back to using `selectors`.

### Methods

The following methods make good candidates for customization needs.

Events:

- `onClick(element, cb)` - setup click event handler
- `onClickLogin()`
- `onClickLogout()`
- `signedIn({profile})` - react to successful Auth0 signin event
- `signedOut()` - react to signout event

Display:

- `show(element)` - show an element
- `hide(element)` - hide an element
- `hideLogin()`
- `hideLogout()`
- `hideWelcome()`
- `displayLogin()`
- `displayLogout()`
- `displayWelcome(profile)`
- `displayWelcomeMsg(profile)`
- `welcomeMsg(profile)` default: `Welcome ${profile.name}`

### Example use

Using all defaults

```js
appAuth.configureAppAuth(lock)
```

Using customised `AppAuth` class via `createAppAuth` factory

```js
class MyAppAuth extends AppAuth {
  // .. customization
}

function createAppAuth(config) {
  return new MyAppAuth(config)
}

configureAppAuth(lock, {
  createAppAuth
})
```
