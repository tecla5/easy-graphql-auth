import test from 'ava'
import {
  setup
} from '../src/setup'

import {
  createStore
} from '@tecla5/token-foundation'

import './mock-localstorage'
import {
  FakeAuth0Lock
} from './fake-auth0-lock'

const Auth0Lock = FakeAuth0Lock

test('setup: with createStore', t => {
  let config = {}
  let opts = {
    Auth0Lock,
    createStore,
    logging: true,
    notifyLog: false
  }

  let {
    lock
  } = setup(config, opts)
  t.is(typeof lock, 'object')
})

test('setup: using default createStore', t => {
  let config = {}
  let opts = {
    Auth0Lock,
    logging: true,
    notifyLog: false
  }

  let {
    lock
  } = setup(config, opts)
  t.is(typeof lock, 'object')
})
