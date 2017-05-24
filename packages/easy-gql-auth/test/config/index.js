import gqlServer from './gqlServer'
import auth0 from './auth0'
import extend from 'deep-extend'

export default extend({}, gqlServer, auth0)