import defaultKeyNames from './keynames'
import {
  Loggable
} from './loggable'
import {
  Store
} from './store'

function isFun(fun) {
  return typeof fun === 'function'
}

export class Configurable extends Loggable {
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
    this.store = this.store || this.createStore()
    return this
  }

  validateConfig() {
    if (this.validated.Configurable) return
    if (!this.store) {
      this.configError('Missing store. Was not configured!')
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
    let container = containers.find(container => (container || {})[name]) || {}
    let value = container[name]
    if (!value) {
      this.warn('no value found for', name)
    }
    if (selfie && value) {
      let displayValue = typeof value === 'function' ? value.name : value
      this.log('extract: set', name, 'to', displayValue)
      this[name] = value
    }
    return value
  }

  extractProperties(containers, ...names) {
    this.log('extractProperties', names)
    return names.reduce((acc, name) => {
      let value = this.extractProperty(containers, name, true)
      acc[name] = value
      return acc
    }, {})
  }

  configError(msg) {
    this.error(msg)
    throw Error(msg)
  }

  on(eventName, observer) {
    this.log('on', eventName, observer)
    let slot = this.observers[eventName] || []
    this.observers[eventName] = slot.concat(observer)
    return this
  }

  publish(eventName, args) {
    this.log('publish', eventName, args)
    this.observers = this.observers || {}
    let observers = this.observers[eventName] || []
    if (observers) {
      observers.map(observer => observer(args))
    } else {
      this.log('no observers registered for', eventName)
    }
    return this
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
    return new Store(keyNames, opts)
  }

  validate(config) {
    if (typeof config !== 'object') {
      throw Error('config must be an object')
    }
  }
}