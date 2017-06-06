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

test('GraphQLAuth: missing connection', t => {
  try {
    createGraphQLAuth(config, {
      logging: true,
      storage,
    })
  } catch (err) {
    t.pass('throws error on missing connection')
  }
})

test('GraphQLAuth: with createConnection', t => {
  try {
    let auth = createGraphQLAuth(config, {
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

// TODO: split up into fine grained tests, for each property being tested!
// use before or beforeEach to set up auth
test('GraphQLAuth: with connection', async t => {
  try {
    let opts = {
      logging: true,
      client,
      storage
    }

    let connection = createConnection(config, opts)
    opts.connection = connection
    let auth = createGraphQLAuth(config, opts)

    t.truthy(auth)

    let clazzes = ['Configurable', 'GraphQLConnection', 'GraphQLAuth']
    clazzes.map(clazz => {
      t.truthy(auth.validated[clazz])
      t.truthy(auth.configured[clazz])
    })

    t.is(auth.gqlServerTokenKeyName, 'gqlAuthToken')
    t.truthy(auth.connection)

    let signinToken = 'xyz'
    auth.setGraphQLServerToken(signinToken)
    let tokenValue = auth.store.getItem(auth.gqlServerTokenKeyName)
    t.is(tokenValue, signinToken)

    let profile = {
      name: 'kris',
      email: 'kris@gmail.com'
    }

    let data = {
      authToken: signinToken,
      profile
    }

    let signinData = await auth.buildSigninUserData(data)
    let {
      variables
    } = signinData
    t.is(variables.authToken, signinToken)

    let userData = auth.buildUserData(data)
    variables = userData.variables

    t.is(variables.authToken, signinToken)
    t.is(variables.name, 'kris')

    let result = await auth.doCreateUser(data)
    t.truthy(result, 'user was created')

    t.pass('all good :)')
  } catch (err) {
    console.error(err)
    t.fail('should not throw error on missing connection')
  }
})