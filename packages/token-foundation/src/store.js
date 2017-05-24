import {
  Loggable
} from './loggable'

export class Store extends Loggable {
  constructor(keyNames, opts = {}) {
    super('Store', opts)
    this.log('create', {
      keyNames,
      opts
    })
    this.keyNames = keyNames.storage || keyNames
    this.storage = opts.storage || opts.keyStore || window.localStorage
    this.auth0IdTokenKeyName = this.keyNames.auth0IdTokenKeyName
    this.gqlServerTokenKeyName = this.keyNames.gqlServerTokenKeyName
  }

  removeItem(name) {
    this.storage.removeItem(name)
  }

  getItem(name) {
    return this.storage.getItem(name)
  }

  setItem(name, value) {
    this.storage.setItem(name, value)
  }

  validateKeyNames(...names) {
    names.map(name => this.validateKeyName(name))
  }

  validateKeyName(name) {
    if (typeof this.keyNames[name] !== 'string') {
      this.error(`keyNames missing ${name}`)
    }
    return this
  }


  error(msg) {
    console.error(msg)
    // throw Error(msg)
  }

  resetAll() {
    this.removeItem(this.auth0TokenKeyName)
    this.removeItem(this.gqlServerTokenKeyName)
  }

  getAll(opts = {}) {
    return {
      auth0Token: this.getItem(this.auth0IdTokenKeyName),
      gqlServerToken: this.getItem(this.gqlServerTokenKeyName),
    }
  }

  store(keyName, value, opts = {}) {
    if (this.keyNames.indexOf(keyName) < 0) {
      throw Error(`keyname mismatch for store: ${keyName}`)
    }

    this.setItem(keyName, value)
  }
}

export function createStore(keyNames, opts = {}) {
  return new Store(keyNames, opts)
}