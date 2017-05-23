import gqlServer from './gqlServer'
import auth0 from './auth0'
import deepMerge from 'deepmerge'
export default deepMerge({}, gqlServer, auth0)