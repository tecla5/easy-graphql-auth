import gc from './gc'
import auth0 from './auth0'
import deepMerge from 'deepmerge'
export default deepMerge({}, gc, auth0)