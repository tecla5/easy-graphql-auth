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
    this.validate(config)
    this.log('configuring with', {
      config,
      opts
    })
    this.opts = this.opts || opts
    this.config = config
    this.configure()
  }

  configure() {
    this.log('configure')
    this.observers = {}
    this.configureStorage()
    this.retrieveTokens()
    return this
  }

  configureStorage() {
    this.log('configureStorage')
    this.storage = this.config.storage
    this.keyNames = this.config.keyNames || this.storage || defaultKeyNames
    this.store = this.config.store || this.createStore()
    return this
  }

  retrieveTokens() {
    this.log('retrieveTokens', {
      store: this.store
    })
    this.tokens = this.store ? this.store.getAll() : {}
  }

  extractProperty(containers, name, selfie) {
    let container = containers.find(container => (container || {})[name])
    let value = container[name]
    if (selfie && value) {
      this[name] = value
    }
    return value
  }

  extractProperties(containers, ...names) {
    return names.map(name => extractProperty(containers, name, true))
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
    let observers = this.observers[eventName] || []
    if (observers) {
      observers.map(observer => observer(args))
    } else {
      this.log('no observers registered for', eventName)
    }
    return this
  }

  handleError(err) {
    this.error(err)
    throw err
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