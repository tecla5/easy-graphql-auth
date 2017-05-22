import {
  setup
} from '@tecla5/gc-auth0-apollo'
import config from '../config'
const lock = setup(config)
export default lock