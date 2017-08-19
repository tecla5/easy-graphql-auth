export function onDocReady(fn) {
  // Sanity check
  if (typeof fn !== 'function') return;

  // If document is already loaded, run method
  if (document.readyState === 'complete') {
    return fn();
  }

  // The document has finished loading and the document has been parsed but sub-resources such as images, stylesheets and frames are still loading. The state indicates that the DOMContentLoaded event has been fired.
  document.addEventListener('interactive', fn, false);
};


export class AppAuth {
  constructor({
    login,
    logout,
    welcome,
    selectors
  }) {
    selectors = selectors || defaults.selectors

    login = login || selectElement(selectors.login)
    logout = logout || selectElement(selectors.logout)
    welcome = welcome || selectElement(selectors.welcome)

    this.selector = {
      login,
      logout,
      welcome
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

    lock.onSuccess('sign:in', this.signedIn)
    lock.onSuccess('sign:out', this.signedOut)
  }

  signedOut() {
    this.selector.welcome.hide()
    this.selector.login.hide()
    this.selector.logout.show()
  }

  signedIn({
    profile
  }) {
    this.selector.logout.hide()
    this.selector.login.show()
    this.welcome()
  }

  welcome() {
    // this.selector.welcome.text(`Welcome ${profile.name}, you have now been signed in :)`)
    this.selector.welcome.show()
  }
}

const defaults = {
  selectors: {
    login: '#login',
    logout: '#logout',
    welcome: '#welcome'
  },
  createAppAuth(config) {
    return new AppAuth(config)
  },
  onReady: $ ? $(document).ready : docReady
}

export function configureAppAuth({
  ready,
  createAppAuth,
  selectors,
  selectElement
}) {
  createAppAuth = createAppAuth || defaults.createAppAuth
  selectElement = selectElement || defaults.onReady

  ready = ready ||
    ready(() => {
      createAppAuth({
        selectElement,
        selectors
      })
    })
}
