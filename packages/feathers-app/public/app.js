function ready(fn) {
  // Sanity check
  if (typeof fn !== 'function') return;

  // If document is already loaded, run method
  if (document.readyState === 'complete') {
    return fn();
  }

  // The document has finished loading and the document has been parsed but sub-resources such as images, stylesheets and frames are still loading. The state indicates that the DOMContentLoaded event has been fired.
  document.addEventListener('interactive', fn, false);
};

ready(loadApp);

function loadApp() {
  const socket = io();
  const client = feathers()
    .configure(feathers.hooks())
    .configure(feathers.socketio(socket));
  const sessions = client.service('sessions');
  const users = client.service('users');

  sessions.on('created', function (session) {
    console.log('User session created', session);
  });
  users.on('created', function (user) {
    console.log('User created', user);
  });

  const config = {
    // should match server-side key defined in localstorage.authTokenKeyName (see config file above)
    storage: {
      authTokenKeyName: 'jwt'
    }
    // more lock config options ...
  };

  // TODO: customize createStore

  let {
    setup,
    createStore,
    createLock
  } = easyAuth0Lock


  const {
    lock
  } = setup(config, {
    Auth0Lock,
    createStore,
    createLock
  })

  lock.onSuccess('signin', signedIn);

  function signedIn(data) {
    let {
      auth0Token,
      profile
    } = data

    // requires feathers client app
    // create user session on server using token
    client.service('sessions').create(data).then(result => {

      // alternatively create user directly (with session)
      // let user = await feathers.service('users').create(data)
      console.log('signedIn', {
        result
      })
    })
  }
}
