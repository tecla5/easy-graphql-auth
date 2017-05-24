import test from 'ava'
import {
  Store
} from '../src/store'

import config from './config'
import storage from './storage'

test('Store', t => {
  t.is(typeof Store, 'function')

  let store = new Store(config, {
    keyStore: storage
  })

  t.is(typeof store, 'object')

  let x = store.getItem('x')
  t.falsy(x)
})

import './mock-localstorage'

test('Mock localStorage', t => {

  t.is(typeof Store, 'function')

  let store = new Store(config)
  // console.log('created store', store)

  t.is(typeof store, 'object')

  let x = store.getItem('x')
  t.falsy(x)
})