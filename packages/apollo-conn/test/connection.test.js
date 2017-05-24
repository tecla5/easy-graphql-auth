import test from 'ava'
import ApolloClient, {
  createNetworkInterface
} from 'apollo-client'
import {
  createConnection
} from '../src/connection.js'
import config from './config'
import './mock-localstorage'

test('createConnection', t => {
  // console.log({
  //   config
  // })
  let conn = createConnection(config, {
    ApolloClient,
    createNetworkInterface
  })

  t.is(conn.config, config)
  t.is(typeof conn.store, 'object')

  t.deepEqual(conn.keyNames, config.storage)
  t.deepEqual(conn.connection, config.gqlServer.connection)
  t.is(typeof conn.networkInterface, 'object')
})