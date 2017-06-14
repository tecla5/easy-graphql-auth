import test from 'ava'
import {
  createLock,
  Lock,
  Store,
  createStore
} from '../src/'

import './mock-localstorage'
import config from './config'

import {
  FakeAuth0Lock
} from './fake-auth0-lock'

const Auth0Lock = FakeAuth0Lock

let lock
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
  t.is(typeof createLock, 'function')
  t.is(typeof Lock, 'function')
  t.is(typeof Auth0Lock, 'function')
})
