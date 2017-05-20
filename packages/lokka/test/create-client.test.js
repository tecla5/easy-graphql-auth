import test from 'ava'
import createClient from '../src/create-client'
import config from './fixtures/config'

test('createClient', t => {
  let client = createClient(config)

  t.is(client.config, config)
  t.is(client.store, config.store)
  t.is(client.keyNames, config.storage)
  t.is(client.connection, config.graphCool.connection)
  t.is(typeof client.networkInterface, 'object')
})