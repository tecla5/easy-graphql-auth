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

test('Signin', async t => {
  let auth = createHttpAuth(config, {
    logging: true,
    client,
    storage
  })

  t.is(auth.config, config)
  t.truthy(auth.connection)

  let authToken = '123456'
  let profile = {
    name: 'kris',
    email: 'kris@gmail.com'
  }

  let data = {
    authToken,
    profile
  }

  try {
    let signedIn = await auth.signin(data)
    console.log({
      signedIn
    })

    t.pass('signed in :)')
  } catch (err) {
    console.error(err)
    t.fail(err.message)
  }
})
