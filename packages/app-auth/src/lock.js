import {
  createConnection
} from '@tecla5/http-auth-conn'
import {
  createLock
} from '@tecla5/easy-gql-auth0'
import config from '../config'

export default createLock(config, {
  createConnection
})
