import test from 'ava'
import config from './config'
import storage from './storage'

import ApolloClient, {
  createNetworkInterface
} from 'apollo-client'

import {
  GraphQLAuth,
  createGraphQLAuth
} from '../src/gql-auth'

import {
  createConnection
} from '@tecla5/apollo-auth-conn'

import './mock-localstorage'

const client = {
  Client: ApolloClient,
  createNetworkInterface
}

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
  auth = createGraphQLAuth(config, opts)
})

test('GraphQLAuth: is an object', async t => {
  t.is(typeof auth, 'object')
})

const clazzes = ['Configurable', 'GraphQLConnection', 'GraphQLAuth']

test('GraphQLAuth: is fully configured and validated', async t => {
  clazzes.map(clazz => {
    t.truthy(auth.validated[clazz])
    t.truthy(auth.configured[clazz])
  })
})

test('GraphQLAuth: gqlServerTokenKeyName', t => {
  t.is(auth.gqlServerTokenKeyName, 'gqlAuthToken')
})

test('GraphQLAuth: has graphQL client connection', t => {
  t.truthy(auth.connection)
})

test('GraphQLAuth: can save and retrieve token from store', t => {
  auth.setGraphQLServerToken(signinToken)
  let tokenValue = auth.store.getItem(auth.gqlServerTokenKeyName)
  t.is(tokenValue, signinToken)
})


test('GraphQLAuth: has graphQL client connection', t => {
  t.truthy(auth.connection)
})

test('GraphQLAuth: buildSigninUserData', t => {
  let signinData = auth.buildSigninUserData(data)
  let {
    variables
  } = signinData
  t.is(variables.authToken, signinToken)
})


test('GraphQLAuth: buildUserData', async t => {
  let userData = auth.buildUserData(data)
  let {
    variables
  } = userData

  t.is(variables.authToken, signinToken)
  t.is(variables.name, 'kris')
})

test('GraphQLAuth: doCreateUser', async t => {
  let result = await auth.doCreateUser(data)
  t.truthy(result, 'user was created')
})

test('GraphQLAuth: doSigninUser', async t => {
  let result = await auth.doSigninUser(data)
  t.truthy(result, 'user was signed in')
})

test('GraphQLAuth: fakeSigninUser', t => {
  let user = auth.fakeSigninUser(profile)
  t.is(typeof user.data, 'object')
})

test('GraphQLAuth: fakeCreateUser', t => {
  let userData = auth.buildUserData(data)

  let user = auth.fakeCreateUser(userData)
  t.is(typeof user, 'object')
})

import {
  signinUser,
  createUser
} from './queries'

// TODO: perform actual query on GraphQL server such as GraphCool
test('GraphQLAuth: doQuery', async t => {
  let query = signinUser
  try {
    let queryResult = await auth.doQuery(query)
    t.is(typeof queryResult, 'object')
  } catch (err) {
    t.pass('should fail unless graphQL server is configured and accepts query')
  }
})
