import test from 'ava'
import config from './config'
import storage from './storage'

import {
  GraphQLAuth,
  createGraphQLAuth
} from '../src/gql-auth'

import './mock-localstorage'

import {
  createConnection
} from '@tecla5/apollo-auth-conn'

import ApolloClient, {
  createNetworkInterface
} from 'apollo-client'

const client = {
  Client: ApolloClient,
  createNetworkInterface,
  createConnection
}

test('Signin', async t => {
  let auth = createGraphQLAuth(config, {
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