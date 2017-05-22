import apollo from '@tecla5/gc-auth0-apollo'
import config from '../config'
import Auth0Lock from 'auth0-lock'
config.Auth0Lock = Auth0Lock

export default apollo.setup(apollo, config)
