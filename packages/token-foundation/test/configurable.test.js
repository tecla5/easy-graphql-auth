import test from 'ava'
import {
  Configurable
} from '../src/configurable'

import config from './config'
import myStore from './store'
import './mock-localstorage'

test('Configurable: storage from config', t => {
  t.is(typeof Configurable, 'function')
  const configured = new Configurable(config)
  t.is(typeof configured.store, 'object')
})

test('Configurable: pass store', t => {
  t.is(typeof Configurable, 'function')
  const configured = new Configurable(config, {
    store: myStore
  })

  t.is(configured.store, myStore)
})


test('extractProperty', t => {
  let storage = config.storage
  const configured = new Configurable(config, {
    storage
  })

  let s = configured.extractProperty([config], 'storage')
  console.log('extracted', {
    xstorage: s,
    storage
  })

  t.is(s, storage)
})

test('extractProperties', t => {
  let storage = config.storage
  config.x = 27
  config.y = 32
  const configured = new Configurable(config, {
    storage
  })
  configured.extractProperties([config], 'x', 'y')
  t.is(configured.x, 27)
  t.is(configured.y, 32)
})