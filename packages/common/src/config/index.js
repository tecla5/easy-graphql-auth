import {
  gc
} from './gc'
import {
  auth0
} from './auth0'
import deepMerge from 'deepmerge'

export const config = deepMerge.all([gc, auth0])