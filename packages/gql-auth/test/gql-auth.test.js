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