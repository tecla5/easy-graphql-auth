export class AppAuth {
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

    // alternative equialen (alias) events: login, logout
    lock.on('signin', this.loggedIn)
    lock.on('signout', this.loggedOut)
  }

  loggedOut() {
    this.selector.welcome.hide()
    this.selector.login.hide()

    this.selector.logout.show()
  }

  loggedIn({
    profile
  }) {
    this.selector.logout.hide()

    this.selector.login.show()
    this.selector.welcome.text(`Welcome ${profile.name}, you have now been signed in :)`)
    this.selector.welcome.show()
  }
}

$(document).ready(() => {
  let auth = new AppAuth({
    login: $('#login'),
    logout: $('#logout')
  })
})
