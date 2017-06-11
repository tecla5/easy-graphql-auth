import gqlServer from './gqlServer'
import auth from './auth'
import extend from 'deep-extend'
export default extend(gqlServer, auth)
