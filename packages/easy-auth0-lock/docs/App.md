# App

A typical single page app using `easy-auth-lock` would something like this:

In the `<head>` we import:

- jQuery
- Auth0 lock library
- polyfill for Babel

We also add a class `hide` to hide elements (`display:none`)

```html
<head>
  <title>Common Auth0 app</title>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.2.1/jquery.min.js">
  </script>
  <script src="http://cdn.auth0.com/js/lock/10.16.0/lock.min.js"></script>
  <script src="node_modules/babel-polyfill/dist/polyfill.min.js"></script>
  <style>
    .hide {
      display: none
    }
  </style>
</head>
```

In the `<body>` section we include `login` and `logout` buttons and a `welcome` element.
Initially `logout` and `welcome` are hidden via `class="hide"` so only the `login` element is displayed.

```html
<body>
  <h1>Auth0 Lock app</h1>
  <div id="app">
    <h3 id="welcome" class="hide"></h3>
    <div id="session">
      <button id="login">Login</button>
      <button id="logout" class="hide">Logout</button>
    </div>
    <div class="status"></div>
  </div>
```

We add a document ready callback (ensuring page is fully loaded) to execute the Auth0 lock functionality.

In the callback we create the `lock` instance via `createLock` (from `easy-auth0-lock` which wraps Auth0 lock). We subscribe to the `authenticated` Auth0 lock event and also add an event handler for the lock `sign:in` event/notification.

Finally we add jQuery click handlers for login to trigger display of the auth0 lock (ie. `lock.showLock()` and for logout to reset the user session via `lock.logout()`.

```html
  <script src="dist/app.js"></script>
  <script>
    $(document).ready(() => {
      var lock = easyAuth0.createLock({
        Auth0Lock
      })
      lock
        .enableLog()
        .subscribeAuthenticated()
        .on('sign:in', function (res) {
          console.log('logged in', res)
        })

      $('#login').click(function () {
        lock.showLock()
      })

      $('#logout').click(function () {
        lock.logout()
      })
    })
  </script>
</body>
```
