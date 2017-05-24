import test from 'ava'
import config from './config'
import {
  GraphQLAuth,
  createGraphQLAuth
} from '../src/auth'
import storage from './storage'
import './mock-localstorage'

test('GraphQLAuth', t => {
  console.log({
    config
  })
  let auth = createGraphQLAuth(config, {
    storage
  })
  console.log({
    auth
  })
  t.is(auth.config, config)
})