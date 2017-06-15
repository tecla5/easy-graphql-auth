import {
  setup,
  createStore,
  createLock as makeLock
} from '@tecla5/easy-auth0-lock'

export function createLock(config, opts = {}) {
  let {
    serverSignin,
    ServerAuth,
    GraphQLAuth,
    createConnection,
    Auth0Lock
  } = opts

  Auth0Lock = Auth0Lock || config.Auth0Lock
  ServerAuth = ServerAuth || GraphQLAuth

  let lock = setup(config, {
    Auth0Lock,
    createConnection,
    createStore,
    createLock: makeLock
  })

  async function basicServerSignin(authResult) {
    this.gqlAuth = new ServerAuth(this.config, this.opts)
    let result = await this.signin(authResult)
    return result
  }

  lock.serverSignin = serverSignin || basicServerSignin
  lock.serverSignin.bind(lock)

  return lock
}
