import test from 'ava'
import config from './config'
import storage from './storage'
import {
  GraphQLConnection as Connection
} from '../src/connection'

import './mock-localstorage'

test('createConnection', t => {
  let connection = new Connection(config, {
    logging: true,
    storage
  })

  t.is(connection.config, config)
})