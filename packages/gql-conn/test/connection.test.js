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
  let connection = new Connection(config, opts)

  t.is(connection.config, config)
  t.is(connection.opts, opts)

  // contains key methods
  t.is(typeof connection.extractProperty, 'function')
  t.is(typeof connection.extractProperties, 'function')
})