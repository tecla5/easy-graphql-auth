import test from 'ava'
import {
  createLock,
  Lock,
  Store,
  createStore
} from '../src/'

import './mock-localstorage'
import config from './config'

import Auth0Lock from 'auth0-lock'

test.before(t => {
  console.log({
    createStore,
    createLock,
    config,
    Auth0Lock
  })

  lock = createLock(config, {
    // client,
    createStore,
    Auth0Lock
  })
})

test('lock', t => {
  t.is(createLock, 'function')
  t.is(Lock, 'function')
  t.is(Auth0Lock, 'function')
})
