import test from 'ava'
import {
  Configurable
} from '../src/configurable'

import config from './config'
import storage from './storage'

test('Configurable', t => {
  t.is(typeof Configurable, 'function')
  const configured = new Configurable(config, {
    storage
  })

  t.is(typeof configured.store, 'object')
})