import test from 'ava'
import {
  Configurable
} from '../src/configurable'
import {
  Store
} from '../src/store'

import config from './config'
import myStore from './store'
import './mock-localstorage'

test('Configurable: storage from config', t => {
  t.is(typeof Configurable, 'function')
  const configured = new Configurable(config)
  let store = configured.store

  t.is(typeof store, 'object')

  store.setItem('x', 3)
  let x = store.getItem('x')
  t.is(x, '3')
})

test('Configurable: using defaultStore via storage option', t => {
  let storage = config.storage
  let _config = Object.assign({}, config)
  _config.storage = undefined
  t.is(_config.storage, undefined)

  const configured = new Configurable(_config, {
    storage
  })

  let store = configured.store

  t.is(typeof store, 'object')

  store.setItem('x', 2)
  let x = store.getItem('x')
  t.is(x, '2')
})

test('Configurable: pass store', t => {
  t.is(typeof Configurable, 'function')
  const configured = new Configurable(config, {
    store: myStore
  })

  t.is(configured.store, myStore)
})

class MyStore extends Store {
  constructor(keyNames = {}, opts = {}) {
    super(keyNames, opts)
    this.name = 'MyStore'
  }
}

function myCreateStore(keyNames, opts) {
  return new MyStore(keyNames, opts)
}

test('Configurable: createStore', t => {
  t.is(typeof Configurable, 'function')
  const configured = new Configurable(config, {
    store: myStore
  })
  t.is(configured.store, myStore)
})


test('Configurable: pass createStore', t => {
  t.is(typeof Configurable, 'function')
  const configured = new Configurable(config, {
    createStore: myCreateStore
  })

  t.is(configured.store.name, 'MyStore')
})

test('extractProperty', t => {
  let storage = config.storage
  const configured = new Configurable(config, {
    storage
  })

  let s = configured.extractProperty([config], 'storage')
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
