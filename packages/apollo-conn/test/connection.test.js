import test from 'ava'
import ApolloClient from 'apollo-client'
import {
  createConnection
} from '../src/connection.js'
import config from './config'

test('createConnector', t => {
  let conn = createConnection(config, {
    ApolloClient
  })

  t.is(conn.config, config)
  t.is(conn.store, config.store)
  t.is(conn.keyNames, config.storage)
  t.is(conn.connection, config.graphCool.connection)
  t.is(typeof conn.networkInterface, 'object')
})