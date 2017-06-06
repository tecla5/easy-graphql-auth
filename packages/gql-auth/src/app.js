import {
  config
} from './config'
import {
  createGraphQLAuth
} from './auth'

export default function gqlServerAuth(config) {
  return createGraphQLAuth(config)
}