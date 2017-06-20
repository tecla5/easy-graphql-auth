export default {
  server: {
    routes: {
      user: {
        create: 'users',
      },
      login: 'session/login',
      logout: 'session/logout'
    }
  },
  storage: {
    // key to store feathers server auth Token
    serverTokenKeyName: 'feathersAuthToken'
  }
}
