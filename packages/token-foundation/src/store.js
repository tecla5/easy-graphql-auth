import {
  Notifiable
} from './notifiable'

export function createStore(keyNames, opts = {}) {
  return new Store(keyNames, opts)
}

export class Store extends Notifiable {
  constructor(keyNames, opts = {}) {
    super('Store', opts)
    this.log('create', {
      keyNames,
      opts
    })
    this.keyNames = keyNames.storage || keyNames
    this.storage = opts.storage || opts.keyStore || window.localStorage
    this.authTokenKeyName = this.keyNames.authTokenKeyName
    this.gqlServerTokenKeyName = this.keyNames.gqlServerTokenKeyName
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
    this.removeItem(this.authTokenKeyName)
    this.removeItem(this.gqlServerTokenKeyName)
    this.publish('reset')
    return this
  }

  getAll(opts = {}) {
    return {
      authToken: this.getItem(this.authTokenKeyName),
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