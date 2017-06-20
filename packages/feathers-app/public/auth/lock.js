import {
  createConnection
} from '@tecla5/http-auth-conn'
import {
  createLock
} from '@tecla5/easy-gql-auth0'
import config from '../config'

import ApolloClient, {
  createNetworkInterface
} from 'apollo-client'

const client = {
  createNetworkInterface,
  Client: ApolloClient
}

export default createLock(config, {
  client,
  createConnection
})
