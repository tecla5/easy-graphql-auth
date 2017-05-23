import test from 'ava'
import {
  Configurable
} from '../src/configurable'

test('Configurable', t => {
  let config = {}
  let configurable = new Configurable(config)

  t.is(configurable.config, config)
})