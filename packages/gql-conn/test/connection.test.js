import test from 'ava'
import config from './config'
import storage from './storage'
import {
  GraphQLConnection as Connection
} from '../src/gql-connection'

import './mock-localstorage'

test('createConnection', t => {
  let opts = {
    logging: true,
    storage
  }
  let conn = new Connection(config, opts)

  t.is(conn.config, config)
  t.is(conn.opts, opts)

  // contains key methods
  t.is(typeof conn.extractProperty, 'function')
  t.is(typeof conn.extractProperties, 'function')

  // created a store via defaultCreateStore
  t.is(typeof conn.store, 'object')
})