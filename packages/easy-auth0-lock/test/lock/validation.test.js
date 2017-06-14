import test from 'ava'
// {
//   Auth0Lock,
//   // Auth0Lock config
//   title, // title of Auth0Lock form
//   logo, // logo of Auth0Lock form
//   theme, // theme config for Auth0Lock form
//   dict, // text config for Auth0Lock form

//   // showLock display/behavior configuration
//   lockConfig,
//   // display method override
//   displayMethod
//   // custom factory method
//   createLockUi,

//   // names of keys to store
//   keyNames,
//   // (local) storage config obj
//   storage,
//   // store to use for storage
//   store,
//   // service configs (tokens etc)
//   auth0
// }

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

test('Lock: configuration - validated via postConfig', t => {
  let title = 'Please log in'
  let configuration = newConfiguration({
    title
  })
  let lock = newLock(configuration)

  t.truthy(lock.validated.Lock)
})

test('Lock: validateConfig(true) - postConfig, no re-validation', t => {
  let title = 'Please log in'
  let configuration = newConfiguration({
    title
  })
  let lock = newLock(configuration)
  t.truthy(lock.validated.Lock)
  // TODO: set sth
  lock.theme = {}
  lock.validated.Lock = false
  lock.postConfig()

  // ensure NOT re-validated
  t.falsy(lock.validated.Lock)
})


test('Lock: validateConfig(true) - forced validation', t => {
  let title = 'Please log in'
  let configuration = newConfiguration({
    title
  })
  let lock = newLock(configuration)

  lock.validated.Lock = false
  // set sth
  lock.theme = {}
  lock.validateConfig(true)

  // ensure re-validated
  t.truthy(lock.validated.Lock)
})
