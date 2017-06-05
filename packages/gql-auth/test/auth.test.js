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
      Client: ApolloClient,
      createConnection
    })
    t.truthy(auth)
    t.pass('all good :)')
  } catch (err) {
    console.log(err)
    t.fail('should not throw error on missing connection')
  }
})

test('GraphQLAuth: with connection', t => {
  try {
    let opts = {
      logging: true,
      Client: ApolloClient,
      storage
    }

    let connection = createConnection(config, opts)
    opts.connection = connection
    let auth = createGraphQLAuth(config, opts)
    t.truthy(auth)
    t.pass('all good :)')
  } catch (err) {
    t.fail('should not throw error on missing connection')
  }
})