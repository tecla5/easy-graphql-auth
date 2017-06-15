import {
  Notifiable
} from './notifiable'

import defaultKeyNames from './keyNames'

function isObj(val) {
  return typeof val === 'object' && val !== null
}

export function createStore(keyNames, opts = {}) {
  return new Store(keyNames, opts)
}

export class Store extends Notifiable {
  constructor(keyNames, opts = {}) {
    super('Store', opts)
    this.configured = {}
    this.validated = {}
    this.keyNames = keyNames
    this.opts = opts
    this.log('create', {
      keyNames: this.keyNames,
      opts: this.opts
    })
    this.configure()
    this.postConfigure()
  }

  configure(force) {
    if (this.configured.Store && !force) return
    this.configured.Store = false
    let keyNames = this.keyNames || {}
    let opts = this.opts
    try {
      this.keyNames = Object.assign({}, this.defaultKeyNames, keyNames.storage || keyNames)
      this.configureKeyNames()

      this.storage = opts.store || opts.keyStore || this.localStorage
      this.configured.Store = true
    } catch (err) {
      this.handleError('Store.configure', {
        opts,
        keyNames,
        errMsg: err.message,
        cause: err
      })
    }
  }

  get defaultKeyNames() {
    return defaultKeyNames
  }

  configureKeyNames(keyNames) {
    keyNames = keyNames || this.keyNames
    if (!isObj(keyNames)) {
      this.handleError('keyNames must be an Object', {
        keyNames,
        defaultKeyNames: this.defaultKeyNames
      })
    }
    // TODO: set in this.keys object instead
    this.authTokenKeyName = keyNames.authTokenKeyName
    this.gqlServerTokenKeyName = keyNames.gqlServerTokenKeyName
    this.serverTokenKeyName = keyNames.serverTokenKeyName
  }

  postConfigure() {
    this.validateConfig()
  }

  validateConfig() {
    this.validated.Store = false
    this.log('validateConfig')
    this.validateAllKeyNames()
    this.validated.Store = true
  }

  // TODO: iterate and validate keys in store
  validateAllKeyNames() {
    this.validateKeyName('authTokenKeyName')
    this.validateKeyName('gqlServerTokenKeyName', 'warn')
    this.validateKeyName('serverTokenKeyName', 'warn')
  }

  validateKeyName(keyName, method) {
    if (!this[keyName]) {
      this[method](`Store: key ${keyName} not defined`, {
        keyNames: this.keyNames,
        store: this
      })
    }
  }

  validateKeyNames(...names) {
    names.map(name => this.validateKeyName(name))
  }

  get localStorage() {
    try {
      return window.localStorage
    } catch (err) {
      this.handleError('missing global window Object to retrieve localStorage')
    }
  }

  removeItem(name) {
    this.storage.removeItem(name)
    this.publish('remove', {
      name
    })
    return this
  }

  getItem(name) {
    return this.storage.getItem(name)
  }

  setItem(name, value) {
    this.storage.setItem(name, value)
    this.publish('set', {
      name,
      value
    })
    return this
  }

  // TODO: iterate and remove keys in store
  resetAll() {
    this.removeItem(this.authTokenKeyName)
    this.removeItem(this.gqlServerTokenKeyName)
    this.removeItem(this.serverTokenKeyName)

    this.publish('reset')
    return this
  }

  // TODO: iterate and (reduce) return keys in store
  getAll(opts = {}) {
    return {
      authToken: this.getItem(this.authTokenKeyName),
      gqlServerToken: this.getItem(this.gqlServerTokenKeyName),
      serverToken: this.getItem(this.serverTokenKeyName),
    }
  }

  store(keyName, value, opts = {}) {
    if (this.keyNames.indexOf(keyName) < 0) {
      throw Error(`keyname mismatch for store: ${keyName}`)
    }

    this.setItem(keyName, value)
  }
}
