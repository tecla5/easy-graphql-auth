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
    // key to store server auth Token
    serverTokenKeyName: 'serverAuthToken'
  }
}
