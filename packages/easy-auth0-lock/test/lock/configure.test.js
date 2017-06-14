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
} from '../src/'

import './mock-localstorage'
import baseConfig from './config'

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

test('Lock: configuration - title', t => {
  let title = 'Please log in'
  let configuration = newConfiguration({
    title
  })
  let lock = newLock(configuration)

  t.is(lock.dict.title, title)
})

test('Lock: configuration - logo', t => {
  let logo = 'http://logo.png'
  let configuration = newConfiguration({
    logo
  })
  let lock = newLock(configuration)

  t.is(lock.theme.logo, logo)
})

test('Lock: configuration - theme', t => {
  let logo = 'http://logo.png'
  let theme = {
    logo
  }

  let configuration = newConfiguration({
    theme
  })
  let lock = newLock(configuration)

  t.is(lock.theme, theme)
})

test('Lock: configuration - dict', t => {
  let title = 'Please log in'
  let dict = {
    title
  }

  let configuration = newConfiguration({
    dict
  })
  let lock = newLock(configuration)

  t.is(lock.dict, dict)
})

// TODO: ...
