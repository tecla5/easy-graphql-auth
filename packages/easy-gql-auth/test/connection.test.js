import test from 'ava'
import {
  createConnector,
  Connector
} from '../src/connector'

test('createConnector', t => {
  let config = {}
  let connector = createConnector(config)

  t.is(connector.config, config)
})