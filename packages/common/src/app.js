import {
  setup,
  createStore,
  createLock
} from './'
import {
  config
} from './config'

export default function gcAuth0(Auth0Lock) {
  config.Auth0Lock = Auth0Lock

  return setup({
    createStore,
    createLock
  }, config)
}