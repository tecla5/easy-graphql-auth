import test from 'ava'
import {
  createConnection
} from '../src/fetch-auth-conn.js'
import config from './config'
import './mock-localstorage'

let conn, opts

test.before(t => {
  opts = {
    logging: false,
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

test('doQuery: with client', t => {
  let query = 'select * from users'
  try {
    conn.createClient()
    conn.doQuery(query)
    t.pass('yay!')
  } catch (err) {
    // console.log({
    //   err
    // })
    t.fail('oops!')
  }
})

test('doQuery: missing client', t => {
  let query = 'select * from users'
  try {
    conn.client = null
    conn.doQuery(query)
  } catch (err) {
    t.pass('yay!')
  }
})

test('connect - empty storage', t => {})

test('connect - auth token in storage', t => {

})
