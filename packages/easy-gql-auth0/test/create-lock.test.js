import test from 'ava'
import config from './config'

import {
  createLock
} from '../src'

import {
  createStore
} from './store'

import {
  createConnection
} from '@tecla5/apollo-auth-conn'

import './mock-localstorage'

const ApolloClient = {

}

test('createLock', t => {
  console.log({
    createStore,
    createLock,
    config
  })
  let lock = createLock(config, {
    ApolloClient,
    createConnection,
    createStore
  })
  t.is(typeof lock, 'object')
})