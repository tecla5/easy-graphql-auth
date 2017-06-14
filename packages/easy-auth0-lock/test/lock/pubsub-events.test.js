import test from 'ava'
import {
  createLock,
  Lock,
  Store,
  createStore
} from '../../src/'

import '../mock-localstorage'
import baseConfig from '../config'

// import Auth0Lock from 'auth0-lock'
import {
  FakeAuth0Lock
} from '../fake-auth0-lock'

function newLock(configuration) {
  return createLock(configuration, {
    createStore,
    Auth0Lock
  })
}

function newConfiguration(config) {
  return Object.assign({}, baseConfig, config, {
    Auth0Lock: FakeAuth0Lock
  })
}

let profile = {
  name: 'kris',
  idToken: '123'
}
let error = {
  msg: 'Server connetion broken',
}

// Test Notifiable methods
test('Lock: subscribeSuccess:signin', t => {
  let configuration = newConfiguration()
  let lock = newLock(configuration)

  lock.onSuccess('signin', (data) => {
    t.is(data, profile)
  })

  // simulate signin event with profile and auth0 token
  lock.notifySuccess('signin', profile)
})

// Test Notifiable methods
test('Lock: subscribeSuccess:signin', t => {
  let configuration = newConfiguration()
  let lock = newLock(configuration)

  lock.onFailure('signin', (data) => {
    t.is(data, error)
  })

  // simulate signin event with profile and auth0 token
  lock.notifyFailure('signin', error)
})

test('Lock: logout events - tokens:reset, store:reset, logout', t => {
  let configuration = newConfiguration()
  let lock = newLock(configuration)

  lock.onSuccess('tokens:reset', (data) => {
    t.truthy(data)
  })

  lock.onSuccess('store:reset', (data) => {
    t.truthy(data)
  })

  lock.onSuccess('logout', (data) => {
    t.truthy(data)
  })

  // simulate signin event with profile and auth0 token
  lock.logout()
})

test('Lock: signin success', t => {
  let configuration = newConfiguration()
  let lock = newLock(configuration)

  lock.onSuccess('signin', (data) => {
    t.truthy(data, profile)
  })

  lock.signedInOk(profile)
})

test('Lock: signin failure', t => {
  let configuration = newConfiguration()
  let lock = newLock(configuration)

  lock.onFailure('signin', (data) => {
    t.truthy(data.error, error)
  })

  lock.signedInFailure({
    profile,
    err: error
  })
})
