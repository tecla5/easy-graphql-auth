import test from 'ava'
import ApolloClient, {
  createNetworkInterface
} from 'apollo-client'
import {
  createConnection
} from '../src/auth-connection.js'
import config from './config'
import './mock-localstorage'

test('createConnection', t => {
  let conn = createConnection(config, {
    ApolloClient,
    createNetworkInterface
  })

  t.is(conn.config, config)
  t.is(typeof conn.store, 'object')

  t.deepEqual(conn.keyNames, config.storage)

  t.deepEqual(conn.networkInterface._uri, config.gqlServer.connection.uri)
  t.is(typeof conn.networkInterface, 'object')
})

test('connect - empty storage', t => {})


test('connect - auth token in storage', t => {

})