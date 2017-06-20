import test from 'ava'
import config from './config'
import storage from './storage'
import jQuery from 'jquery'

import {
  HttpAuth,
  createHttpAuth
} from '../src/http-auth'

import {
  createConnection,
  HttpAuthConn,
  FetchAuthConn,
  AjaxAuthConn
} from '@tecla5/http-auth-conn'

import './mock-localstorage'

const client = jQuery

test('HttpAuth: missing connection', t => {
  try {
    createHttpAuth(config, {
      logging: true,
      storage,
    })
  } catch (err) {
    t.pass('throws error on missing connection')
  }
})

test('HttpAuth: with createConnection', t => {
  try {
    let auth = createHttpAuth(config, {
      logging: true,
      storage,
      client,
      createConnection
    })
    t.truthy(auth)
    t.pass('all good :)')
  } catch (err) {
    console.error(err)
    t.fail('should not throw error on missing connection')
  }
})
