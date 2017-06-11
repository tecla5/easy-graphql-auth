import test from 'ava'
import ApolloClient, {
  createNetworkInterface
} from 'apollo-client'
import {
  createConnection
} from '../src/auth-connection.js'
import config from './config'
import './mock-localstorage'

let conn, opts

test.before(t => {
  opts = {
    logging: true,
    Client: ApolloClient,
    createNetworkInterface
  }

  conn = createConnection(config, opts)
})

test('has config', t => {
  t.is(conn.config, config)
})

test('has opts', t => {
  t.is(conn.opts, opts)
})

test('has console io', t => {
  t.is(conn.io, console)
})

test('has store', t => {
  t.is(typeof conn.store, 'object')
})

test('has keyNames from storage', t => {
  t.deepEqual(conn.keyNames, config.storage)
})

test('is configured', t => {
  t.truthy(conn.configured.ApolloConn)
})

test('config is validated', t => {
  t.truthy(conn.validated.ApolloConn)
})

test('has networkInterface settings', t => {
  t.is(typeof conn.networkInterface, 'object')
  t.deepEqual(conn.networkInterface._uri, config.gqlServer.connection.uri)
})

test('configure: bind custom factory methods', t => {
  opts.bind = true
  conn = createConnection(config, opts)
  t.pass('factory methods were bound to class instance')
})

test('connect - empty storage', t => {})

test('connect - auth token in storage', t => {

})
