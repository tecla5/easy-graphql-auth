import gqlServer from './gqlServer'
import auth from './auth'
import deepMerge from 'deepmerge'
export default deepMerge({}, gqlServer, auth)