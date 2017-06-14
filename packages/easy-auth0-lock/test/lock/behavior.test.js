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
const Auth0Lock = FakeAuth0Lock

function newLock(configuration, opts = {}) {
  opts = Object.assign({}, opts, {
    createStore,
    Auth0Lock
  })

  return createLock(configuration, opts)
}

function newConfiguration(config) {
  return Object.assign({}, baseConfig, config, {
    Auth0Lock
  })
}

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

  t.deepEqual(theme, {})
})

test('Lock: defaultLockConfig', t => {
  let configuration = newConfiguration()
  let lock = newLock(configuration)
  let lockConfig = lock.defaultLockConfig
  // console.log({
  //   lockConfig
  // })

  t.deepEqual(lockConfig, {
    languageDictionary: {
      title: lock.defaultTitle
    }
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
    languageDictionary: dict
  })
})

test('Lock: setupLockConfig', t => {
  let dict = {
    title: 'Welcome'
  }

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
  let tokenName = lock.authTokenKeyName
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
  let lock = newLock(configuration, {
    logging: true
  })
  // no effect, already happened
  lock.onHashParsed()
})

// Test Notifiable methods (superclass)
test('Lock: publish()', t => {
  let configuration = newConfiguration()
  let lock = newLock(configuration)
  lock.on('hello', (data) => {
    t.is(data, 2)
  })
  lock.publish('hello', 2)
})

test('Lock: nofifySuccess', t => {
  let configuration = newConfiguration()
  let lock = newLock(configuration)
  lock.onSuccess('signin', (data) => {
    t.is(data, 2)
  })
  lock.onFailure('signin', (data) => {
    t.fail('no signin failure!')
  })

  lock.notifySuccess('signin', 2)
})

test('Lock: nofifyFailure', t => {
  let configuration = newConfiguration()
  let lock = newLock(configuration)
  lock.onSuccess('signin', (data) => {
    t.fail('no signin success!')
  })
  lock.onFailure('signin', (data) => {
    t.is(data, 2)
  })

  lock.notifyFailure('signin', 2)
})
