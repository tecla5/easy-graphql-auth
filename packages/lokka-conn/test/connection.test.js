import {
  Lokka
} from 'lokka'
import {
  Transport
} from 'lokka-transport-http'

import test from 'ava'
import {
  createConnection
} from '../src/connection.js'
import config from './config'
import './mock-localstorage'

test('createConnection', t => {
  let conn = createConnection(config, {
    Lokka,
    Transport
  })

  t.is(conn.config, config)
  t.is(typeof conn.store, 'object')

  t.deepEqual(conn.keyNames, config.storage)
  t.deepEqual(conn.connection, config.gqlServer.connection)

  t.deepEqual(conn.endpoint, config.gqlServer.endPoint)
  t.notDeepEqual(conn.endpoint, config.gqlServer.connection.uri)
})