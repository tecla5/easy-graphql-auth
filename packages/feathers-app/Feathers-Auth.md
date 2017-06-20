# Feathers Auth0 JWT token authentication

Feathers auth using [feathers-authentication-client](https://github.com/feathersjs/feathers-authentication-client)

Please see this [issue discussion](https://github.com/feathersjs/feathers-authentication-jwt/issues/23#issuecomment-309594570)

Needs to be integrated with the following flow/configuration:

```js
const feathers = require('feathers/client');
const rest = require('feathers-rest/client');
const superagent = require('superagent');
const hooks = require('feathers-hooks');
const localStorage = require('localstorage-memory');
const auth = require('feathers-authentication-client');

const client = feathers();

// NOTE: the order is important: auth must be configured _after_ rest/socket
client.configure(hooks())
  .configure(rest('http://localhost:3030').superagent(superagent))
  .configure(auth({ storage: localStorage }));

client.authenticate({
  strategy: 'local',
  email: 'admin@feathersjs.com',
  password: 'admin'
})
.then(response => {
  console.log('Authenticated!', response);
  return client.passport.verifyJWT(response.accessToken);
})
.then(payload => {
  console.log('JWT Payload', payload);
  return client.service('users').get(payload.userId);
})
.then(user => {
  client.set('user', user);
  console.log('User', client.get('user'));
})
.catch(function(error){
  console.error('Error authenticating!', error);
});
```

We pretty much just have to replace:

```js
client.authenticate({
  strategy: 'local',
  email: 'admin@feathersjs.com',
  password: 'admin'
})
.then(response => {
  console.log('Authenticated!', response);
  return client.passport.verifyJWT(response.accessToken);
})
```

With something like:

```js
lock
  .subscribeAuthenticated()
  .showLock(displayConfig)
  .onSuccess('signin', (data) => {
    let {
      auth0Token,
      profile
    } = data
    console.log('Authenticated!', data)

    try {
      let payload = await client.passport.verifyJWT(data.auth0Token);
      console.log('JWT Payload', payload);
      let user = await client.service('users').get(payload.userId);
      client.set('user', user);
      console.log('User', client.get('user'));
    } catch (err) {
      console.error('Error authenticating!', error);
    }
  })
```
