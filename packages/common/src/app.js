import {
  setup,
  createStore,
  createLock
} from './'
import {
  config
} from './config'

export default function gqlServerAuth0(Auth0Lock) {
  config.Auth0Lock = Auth0Lock

  let res = setup({
    createStore,
    createLock
  }, config)
  return res.lock
}