import defaultKeyNames from './keynames'
import {
  Notifiable
} from './notifiable'

import {
  Store,
  createStore
} from './store'

import {
  isFun,
  isObject,
  isArray
} from './is-type'

export class Configurable extends Notifiable {
  constructor(config = {}, opts = {}) {
    super('Configurable', opts)
    this.configured = {}
    this.validated = {}

    this.validate(config)
    this.log('configuring with', {
      config,
      opts
    })
    this.opts = this.opts || opts
    this.config = config
    this.configure()
    this.postConfig()
  }

  configure() {
    if (this.configured.Configurable) return
    this.log('Configurable: configure')
    this.observers = {}
    this.configureStorage()
    this.configured.Configurable = true
    return this
  }

  postConfig() {
    this.validateConfig()
    this.retrieveTokens()
    return this
  }

  configureStorage() {
    this.log('configureStorage')
    let config = this.config
    let opts = this.opts
    let containers = [config, opts]
    this.extractProperties(containers, 'storage', 'keyNames', 'store')
    this.keyNames = this.keyNames || this.storage || defaultKeyNames
    this.store = this.store || this.createStore(this.keyNames, this.opts)
    return this
  }

  validateConfig(force = false) {
    if (this.validated.Configurable && !force) return
    this.log('validateConfig', {
      store: this.store,
      keyNames: this.keyNames
    })
    if (typeof this.store !== 'object') {
      this.configError('missing store for holding auth tokens')
    }

    if (typeof this.keyNames !== 'object') {
      this.configError('missing keyNames object, used to indicate store token keys')
    }
    this.validated.Configurable = true
  }

  retrieveTokens() {
    this.log('retrieveTokens', {
      store: this.store
    })
    if (!isFun(this.store.getAll)) {
      this.error("Store is missing function getAll to retrieve tokens")
    }
    this.tokens = this.store.getAll() || {}
    return this
  }

  extractProperty(containers, name, selfie) {
    this.log('extractProperty', name, {
      self: selfie
    })
    if (!isArray(containers)) {
      this.handleError('extractProperty: containes must be an Array', containers)
    }

    let container = containers.find(container => (container || {})[name]) || {}
    let value = container[name]
    if (!value) {
      this.warn('no value found for', name)
    }
    if (selfie && value) {
      let displayValue = isFun(value) ? value.name : value
      this.log('extract: set', name, 'to', displayValue)
      this[name] = value
    }
    return value
  }

  extractProps(selfie, containers, ...names) {
    this.log('extractProperties', names)
    return names.reduce((acc, name) => {
      let value = this.extractProperty(containers, name, selfie)
      acc[name] = value
      return acc
    }, {})
  }

  extractProperties(containers, ...names) {
    return this.extractProps(true, containers, ...names)
  }

  configError(msg) {
    this.handleError(msg)
  }

  createStore(keyNames, opts = {}) {
    let {
      createStore
    } = opts
    keyNames = keyNames || this.keyNames
    opts = opts || this.opts
    this.log('createStore', {
      keyNames,
      opts
    })

    createStore = isFun(createStore) ? createStore : this.defaultCreateStore
    this.log('create with', {
      createStore
    })
    return createStore(keyNames, opts)
  }

  defaultCreateStore(keyNames, opts) {
    return createStore(keyNames, opts)
  }

  validate(config) {
    if (!isObject(config)) {
      this.handleError('config must be an object', config)
    }
  }
}
