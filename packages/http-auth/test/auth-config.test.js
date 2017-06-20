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

const profile = {
  name: 'kris',
  email: 'kris@gmail.com'
}

const signinToken = 'xyz'
const data = {
  authToken: signinToken,
  profile
}

let auth

// run once before all the tests are run.
// Ensures auth object is created, which is then tested in each test
test.before(t => {
  let opts = {
    logging: true,
    client,
    storage
  }

  let connection = createConnection(config, opts)
  opts.connection = connection
  auth = createHttpAuth(config, opts)
})

test('HttpAuth: is an object', async t => {
  t.is(typeof auth, 'object')
})

const clazzes = ['Configurable', 'HttpConnection', 'HttpAuth']

test('HttpAuth: is fully configured and validated', async t => {
  clazzes.map(clazz => {
    t.truthy(auth.validated[clazz])
    t.truthy(auth.configured[clazz])
  })
})

test('HttpAuth: serverTokenKeyName', t => {
  t.is(auth.serverTokenKeyName, 'gqlAuthToken')
})

test('HttpAuth: has graphQL client connection', t => {
  t.truthy(auth.connection)
})

test('HttpAuth: can save and retrieve token from store', t => {
  auth.setServerToken(signinToken)
  let tokenValue = auth.store.getItem(auth.serverTokenKeyName)
  t.is(tokenValue, signinToken)
})


test('HttpAuth: has graphQL client connection', t => {
  t.truthy(auth.connection)
})

test('HttpAuth: buildSigninUserData', t => {
  let signinData = auth.buildSigninUserData(data)
  let {
    variables
  } = signinData
  t.is(variables.authToken, signinToken)
})


test('HttpAuth: buildUserData', async t => {
  let userData = auth.buildUserData(data)
  let {
    variables
  } = userData

  t.is(variables.authToken, signinToken)
  t.is(variables.name, 'kris')
})

test('HttpAuth: doCreateUser', async t => {
  let result = await auth.doCreateUser(data)
  t.truthy(result, 'user was created')
})

test('HttpAuth: doSigninUser', async t => {
  let result = await auth.doSigninUser(data)
  t.truthy(result, 'user was signed in')
})

test('HttpAuth: fakeSigninUser', t => {
  let user = auth.fakeSigninUser(profile)
  t.is(typeof user.data, 'object')
})

test('HttpAuth: fakeCreateUser', t => {
  let userData = auth.buildUserData(data)

  let user = auth.fakeCreateUser(userData)
  t.is(typeof user, 'object')
})

import {
  signinUser,
  createUser
} from './queries'

// TODO: perform actual query on Http server such as GraphCool
test('HttpAuth: doQuery', async t => {
  let query = signinUser
  try {
    let queryResult = await auth.doQuery(query)
    t.is(typeof queryResult, 'object')
  } catch (err) {
    t.pass('should fail unless graphQL server is configured and accepts query')
  }
})
