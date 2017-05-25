import defaultKeyNames from './keynames'
import {
  Loggable
} from './loggable'
import {
  Store
} from './store'

export class Configurable extends Loggable {
  constructor(config = {}, opts = {}) {
    super('Configurable', opts)
    this.validate(config)
    let {
      keyNames,
      store,
      storage,
    } = config

    this.observers = {}
    this.opts = this.opts || opts
    this.config = config
    this.storage = storage
    this.keyNames = keyNames || storage || defaultKeyNames
    this.store = store || this.createStore(this.keyNames, opts)
    this.tokens = this.store.getAll()
    this.tokens = this.store ? this.store.getAll() : config.tokens
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

  createStore(keyNames, opts) {
    let {
      createStore
    } = opts
    if (typeof createStore === 'function') {
      return this.createStore(keyNames, opts)
    }
    return this.defaultCreateStore(keyNames, opts)
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