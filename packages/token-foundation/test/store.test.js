import test from 'ava'
import {
  Store
} from '../src/store'

import config from './config'
import myStore from './store'

test('Store', t => {
  t.is(typeof Store, 'function')

  let store = new Store(config, {
    keyStore: myStore
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