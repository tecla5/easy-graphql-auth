export class Store {
  constructor(keyNames, opts = {}) {
    this.keyNames = keyNames
    this.validateKeyName('auth0IdTokenKeyName').validateKeyName('gcTokenKeyName')

    this.auth0IdTokenKeyName = this.keyNames.auth0IdTokenKeyName
    this.gcTokenKeyName = this.keyNames.gcTokenKeyName

    console.log({
      get: this.getItem,
      set: this.setItem
    })
  }

  removeItem(name) {
    localStorage.removeItem(name)
  }

  getItem(name) {
    return localStorage.getItem(name)
  }

  setItem(name, value) {
    localStorage.setItem(name, value)
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
    this.removeItem(this.gcTokenKeyName)
  }

  getAll(opts = {}) {
    return {
      auth0Token: this.getItem(this.auth0IdTokenKeyName),
      graphcoolToken: this.getItem(this.gcTokenKeyName),
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