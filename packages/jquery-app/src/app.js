// import 'babel-polyfill'

import {
  lock,
  client
} from './auth/lock'

class Auth {
  constructor({
    login,
    logout
  }) {
    login = login || $('#login')
    logout = logout || $('#logout')

    this.selector = {
      login,
      logout,
      welcome: $('#welcome')
    }

    this.selector.login.click(() => {
      lock
        .showLock()
        .subscribeAuthenticated()
    })

    this.selector.logout.click(() => {
      lock
        .logout()
    })

    lock.on('signedIn', this.loggedIn)
    lock.on('loggedOut', this.loggedOut)
  }

  loggedOut() {
    this.selector.welcome.hide()
    this.selector.login.hide()

    this.selector.logout.show()
  }

  signedIn({
    profile
  }) {
    this.selector.logout.hide()

    this.selector.login.show()
    this.selector.welcome.text(`Welcome ${profile.name}, you have now been signed in :)`)
    this.selector.welcome.show()
  }
}

$(document).ready(() => {
  let auth = new Auth({
    login: $('#login'),
    logout: $('#logout')
  })
})