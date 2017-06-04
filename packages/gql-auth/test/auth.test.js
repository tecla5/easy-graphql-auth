import test from 'ava'
import config from './config'
import storage from './storage'

import {
  GraphQLAuth,
  createGraphQLAuth
} from '../src/gql-auth'

import './mock-localstorage'

test('GraphQLAuth', t => {
  // console.log({
  //   config
  // })
  let auth = createGraphQLAuth(config, {
    logging: true,
    storage
  })
  // console.log({
  //   auth
  // })
  t.is(auth.config, config)
})