export function onDocReady(fn) {
  // Sanity check
  if (typeof fn !== 'function') return;

  // If document is already loaded, run method
  if (document.readyState === 'complete') {
    return fn();
  }

  // The document has finished loading and the document has been parsed but sub-resources such as images, stylesheets and frames are still loading. The state indicates that the DOMContentLoaded event has been fired.
  document.addEventListener('interactive', fn, false);
}

function isFunction(fun) {
  return fun && typeof fun === 'function'
}

function bindEvent(element, type, handler) {
  if (element.addEventListener) {
    element.addEventListener(type, handler, false);
  } else {
    element.attachEvent('on' + type, handler);
  }
}

export class AppAuth {
  constructor(lock, config = {}) {
    if (!lock) {
      throw new Error('You must pass a lock instance as the first argument to the (AppAuth) constructor')
    }

    let {
      elements,
      selectors,
      selectElement
    } = config

    this.lock = lock
    this.config = config
    elements = elements || {}
    selectors = selectors || defaults.selectors
    login = elements.login || selectElement(selectors.login)
    logout = elements.logout || selectElement(selectors.logout)
    welcome = elements.welcome || selectElement(selectors.welcome)

    this.element = {
      login,
      logout,
      welcome
    }

    this.onClick(this.element.login, this.onClickLogin.bind(this))
    this.onClick(element.logout, this.onClickLogout.bind(this))

    lock.onSuccess('sign:in', this.onSignedIn.bind(this))
    lock.onSuccess('sign:out', this.onSignedOut.bind(this))
  }

  onClick(element, cb) {
    this.isFunction(element.click) ? element.click(cb) : bindEvent(element, 'click', cb)
  }

  onClickLogin() {
    this.lock
      .showLock()
      .subscribeAuthenticated()
  }

  onClickLogout() {
    this.lock
      .logout()
  }

  hide(element) {
    isFunction(element.hide) ? element.hide() : element.classList.add('hide')
  }

  show(element) {
    isFunction(element.show) ? element.show() : element.classList.remove('hide')
  }

  onSignedOut() {
    this.hideWelcome()
    this.hideLogout()
    this.displayLogin()
  }

  onSignedIn({
    profile
  }) {
    this.hideLogin()
    this.displayLogout()
    this.displayWelcome(profile)
  }

  hideWelcome() {
    this.hide(this.element.welcome)
  }

  hideLogin() {
    this.hide(this.element.login)
  }

  hideLogout() {
    this.hide(this.element.logout)
  }

  displayLogin() {
    this.show(this.element.login)
  }

  displayLogout() {
    this.show(this.element.logout)
  }

  displayWelcome(profile) {
    let welcome = this.element.welcome
    displayWelcomeMsg(profile)
    this.show(welcome)
  }

  welcomeMsg(profile) {
    return `Welcome ${profile.name}`
  }

  displayWelcomeMsg(profile) {
    let welcome = this.element.welcome
    let msg = this.welcomeMsg(profile)
    isFunction(welcome.text) ? welcome.text(msg) : welcome.textContent = msg
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
  onReady: $ ? $(document).ready : onDocReady
}

export function configureAppAuth(lock, {
  onReady,
  createAppAuth,
  selectors,
  selectElement
}) {

  if (!lock) {
    throw new Error('You must pass a lock instance as the first argument to configureAppAuth')
  }
  createAppAuth = createAppAuth || defaults.createAppAuth
  selectElement = selectElement || defaults.selectElement
  onReady = onReady || defaults.onReady

  return onReady(() => {
    createAppAuth(lock, {
      selectElement,
      selectors
    })
  })
}
