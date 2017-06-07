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

// can we mock the graphQL client?!
const Client = {}

const client = {
  Client,
  createConnection,
}

let lock

test.before(t => {
  console.log({
    createStore,
    createLock,
    config
  })
  lock = createLock(config, {
    client,
    createStore
  })
})

test('has lock methods', t => {
  // is an instance of Lock from easy-auth0-lock
  t.is(typeof lock, 'object')

  // it has a getUserInfo method (used to display lock)
  t.is(typeof lock.showLock, 'function')

  // has a logout function
  t.is(typeof lock.logout, 'function')
})

test('extractAuthToken', t => {
  // TODO
})

test('async onAuth0Login(data)', async t => {
  // TODO
})

test('async serverSignin(data)', async t => {
  // TODO
})

// TODO ...