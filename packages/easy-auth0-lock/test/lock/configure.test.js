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

test('Lock: configure(true) - forced', t => {
  let title = 'Please log in'
  let configuration = newConfiguration({
    title
  })
  let lock = newLock(configuration)
  t.is(lock.dict.title, title)

  let newTitle = 'New log in'

  lock.opts.title = newTitle
  lock.configure(true)

  t.is(lock.dict.title, newTitle)
})

test('Lock: configure() - unforced', t => {
  let title = 'Please log in'
  let configuration = newConfiguration({
    title
  })
  let lock = newLock(configuration)
  t.is(lock.dict.title, title)

  let newTitle = 'New log in'

  lock.opts.title = newTitle
  lock.configure() // no effect

  // keeps old title, no re-configuration
  t.is(lock.dict.title, title)
})


test('Lock: defaultDisplayMethod', t => {
  let configuration = newConfiguration()
  let lock = newLock(configuration)
  t.is(lock.defaultDisplayMethod, 'getUserInfo')
})

test('Lock: extractAuth0config', t => {
  let configuration = newConfiguration()
  let lock = newLock(configuration)
  let auth0config = lock.extractAuth0config()
  t.is(auth0config.domain, 'my-domain.eu.auth0.com')
})

test('Lock: defaultTheme', t => {
  let configuration = newConfiguration()
  let lock = newLock(configuration)
  let theme = lock.defaultTheme
  t.is(theme, {})
})

test('Lock: defaultLockConfig', t => {
  let configuration = newConfiguration()
  let lock = newLock(configuration)
  let lockConfig = lock.defaultLockConfig
  t.deepEqual(lockConfig, {
    theme: {}
  }, {
    languageDictionary: {}
  })
})

test('Lock: defaultLockConfig : with dict', t => {
  let dict = {
    title: 'Welcome'
  }

  let configuration = newConfiguration({
    dict
  })
  let lock = newLock(configuration)
  let lockConfig = lock.defaultLockConfig
  t.deepEqual(lockConfig, {
    theme: {}
  }, {
    languageDictionary: dict
  })
})

test('Lock: setupLockConfig', t => {
  let configuration = newConfiguration({
    dict,
    lock: {
      x: 2
    }
  })
  let lock = newLock(configuration)
  lock.setupLockConfig()
  t.is(lock.lockConfig.x, 2)
})

test('Lock: auth0IdTokenKeyName', t => {
  let configuration = newConfiguration()
  let lock = newLock(configuration)
  let tokenName = lock.auth0IdTokenKeyName
  t.is(tokenName, 'authToken')
})

test('Lock: auth0Token (setter/getter)', t => {
  let configuration = newConfiguration()
  let lock = newLock(configuration)
  lock.auth0Token = 'xyz'
  let token = lock.auth0Token
  t.is(token, 'xyz')
})

test('Lock: createLockUi(auth0Config = {}, opts)', t => {
  let configuration = newConfiguration()
  let lock = newLock(configuration)
  let config = {
    clientId: 'xyz123',
    domain: 'tecla5.com'
  }
  let opts = {}
  let lockUi = lock.createLockUi(config, opts)
  t.truthy(lockUi instanceof FakeAuth0Lock)
})

test('Lock: onHashParsed()', t => {
  let configuration = newConfiguration()
  let lock = newLock(configuration)
  lock.onHashParsed()

  t.fail('TODO')
})
