import {
  Lokka
} from 'lokka'
import {
  Transport
} from 'lokka-transport-http'

import test from 'ava'
import {
  createConnection
} from '../src/auth-connection.js'
import config from './config'
import './mock-localstorage'

let conn, opts

test.before(t => {
  opts = {
    logging: false,
    Lokka,
    Transport
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

test('transport configured using endpoint', t => {
  t.deepEqual(conn.endpoint, config.gqlServer.endpoint)
  t.notDeepEqual(conn.endpoint, config.gqlServer.connection.uri)
})

test('transport configured, using connection uri for endpoint if not defined', t => {
  let newConfig = Object.assign({}, config)

  newConfig.gqlServer.endpoint = null
  // opts.logging = true
  conn = createConnection(newConfig, opts)
  let gqlServer = newConfig.gqlServer

  t.deepEqual(conn.endpoint, newConfig.gqlServer.endpoint)
  t.deepEqual(conn.endpoint, newConfig.gqlServer.connection.uri)
})

test('configure: bind custom factory methods', t => {
  opts.bind = true
  conn = createConnection(config, opts)
  t.pass('factory methods were bound to class instance')
})

test('configure: missing gqlServer', t => {
  try {
    conn.logging = true
    conn.config.gqlServer = null
    conn.configure(true) // force re-configuration
    t.fail('oops!')
  } catch (err) {
    conn.logging = false
    t.pass('yay!')
  }
})

test('setJwtToken', t => {
  try {
    conn.setJwtToken('x', 23532352)
    t.pass('yay!')
  } catch (err) {
    t.fail('oops!')
  }
})

test('createTransport: missing endpoint', t => {
  try {
    conn.endpoint = null
    conn.createTransport()
  } catch (err) {
    t.pass('yay!')
  }
})

test('createTransport: missing headers', t => {
  try {
    conn.endpoint = 'xyz'
    conn.headers = null
    conn.createTransport()
  } catch (err) {
    t.pass('yay!')
  }
})

test('Validation: missing Client', t => {
  try {
    conn.Client = null
    conn.validateConfig(true)
  } catch (err) {
    t.pass('yay!')
  }
})

test('Validation: missing endpoint', t => {
  try {
    conn.Client = Lokka
    conn.endpoint = null
    conn.validateConfig(true)
  } catch (err) {
    t.pass('yay!')
  }
})

test('Validation: missing createTransport', t => {
  try {
    conn.Client = Lokka
    conn.endpoint = 'xyz'
    conn.createTransport = null
    conn.validateConfig(true)
  } catch (err) {
    t.pass('yay!')
  }
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
