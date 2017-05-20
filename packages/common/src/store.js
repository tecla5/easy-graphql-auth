class Store {
  constructor(keyNames, opts = {}) {
    this.keyNames = keyNames

    this.getItem = opts.getItem || localStorage.getItem
    this.setItem = opts.setItem || localStorage.setItem
  }

  resetAll() {
    this.removeItem(this.keyNames.auth0TokenKeyName)
    this.removeItem(this.keyNames.graphCoolTokenKeyName)
  }

  getAll(opts = {}) {
    return {
      auth0Token: this.getItem(keyNames.auth0IdTokenKeyName),
      graphcoolToken: this.getItem(keyNames.graphcoolTokenKeyName),
    }
  }

  store(keyName, value, opts = {}) {
    this.setItem(keyName, value)
  }
}

function createStore(keyNames, opts = {}) {
  return new Store(keyNames, opts)
}

module.exports = {
  Store,
  createStore
}