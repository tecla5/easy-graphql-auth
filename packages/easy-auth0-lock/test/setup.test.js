import test from 'ava'
import {
  setup
} from '../src/setup'

import {
  createStore
} from '@tecla5/token-foundation'

import {
  createConnection
} from '@tecla5/apollo-auth-conn'

test('setup', t => {
  let config = {}
  let opts = {
    createStore,
    createConnection
  }

  let {
    lock
  } = setup(config, opts)
  t.is(lock, 'function')
})