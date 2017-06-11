import test from 'ava'
import config from './config'
import storage from './storage'
import {
  GraphQLConnection as Connection,
  createConnection
} from '../src/gql-connection'

import './mock-localstorage'

test('new Connection', t => {
  let opts = {
    logging: true,
    storage
  }
  let conn = new Connection(config, opts)

  t.is(conn.config, config)
})

let conn, opts
test.before(t => {
  opts = {
    // logging: true,
    storage
  }
  conn = createConnection(config, opts)
})

test('has config', t => {
  t.is(conn.config, config)
})

test('has opts', t => {
  t.is(conn.opts, opts)
})

test('has extract methods', t => {
  // contains key methods
  t.is(typeof conn.extractProperty, 'function')
  t.is(typeof conn.extractProperties, 'function')
})

test('has store object', t => {
  // created a store via defaultCreateStore
  t.is(typeof conn.store, 'object')
})

test('has auth token methods', t => {
  // authTokenKeyName
  t.is(conn.authTokenKeyName, 'graphcoolToken')
  // authToken
  t.is(conn.authToken, null)
})

test('was validated', t => {
  t.truthy(conn.validated.GraphQLConnection)
})

test('has no defaultHeaders', t => {
  t.is(conn.defaultHeaders, null)
})

test('setJwtToken not implemented', t => {
  try {
    conn.setJwtToken('x', 2)
  } catch (err) {
    t.pass('must be implemented by subclass')
  }
})

test('Connection: missing store', t => {
  let opts = {
    logging: true
  }
  let badConn
  try {
    // using default config for store and keynames if not defined
    badConn = new Connection(config, opts)
    t.truthy(badConn.validated.GraphQLConnection)

    // reset store and validate again!
    badConn.store = undefined
    badConn.validateConfig(true)

  } catch (err) {
    console.error(err)
    t.is(badConn.store, undefined)
    t.falsy(badConn.validated.GraphQLConnection)
    t.pass('missing store')
  }
})

test('Connection: missing token keyNames', t => {
  let opts = {
    logging: false
  }
  let badConn
  try {
    // using default config for store and keynames if not defined
    badConn = new Connection(config, opts)
    t.truthy(badConn.validated.GraphQLConnection)

    // reset store and validate again!
    badConn.keyNames = undefined
    badConn.validateConfig(true)

  } catch (err) {
    console.error(err)
    t.is(badConn.keyNames, undefined)
    t.falsy(badConn.validated.GraphQLConnection)
    t.pass('missing keyNames')
  }
})
