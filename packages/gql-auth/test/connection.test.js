import test from 'ava'
import config from './config'
import storage from './storage'

import {
  GraphQLAuth,
  createGraphQLAuth
} from '../src/gql-auth'

import './mock-localstorage'

test('Connection', t => {
  let connection = createGraphQLAuth(config, {
    logging: true,
    storage
  })

  t.is(connection.config, config)
})