import test from 'ava'
import createConnector from '../src/create-conn'
import config from './fixtures/config'

test('createConnector', t => {
  let conn = createConnector(config)

  t.is(conn.config, config)
  t.is(conn.store, config.store)
  t.is(conn.keyNames, config.storage)
  t.is(conn.connection, config.graphCool.connection)
  t.is(typeof conn.networkInterface, 'object')
})