import defaultKeyNames from './keynames'

export class Configurable {
  constructor(config = {}, opts = {}) {
    this.validate(config)
    let {
      store,
      storage,
      auth0,
      gqlServer
    } = config

    this.config = config
    this.io = opts.io || console
    this.logging = opts.logging
    this.observers = {}
    this.config = config
    this.storage = storage
    this.keyNames = keyNames || storage || defaultKeyNames
    this.store = store || this.defaultCreateStore(this.keyNames, opts)
    this.tokens = this.store.getAll()
    this.auth0 = config.auth0
    this.gqlServer = gqlServer
    this.tokens = this.store ? this.store.getAll() : config.tokens
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

  enableLog() {
    this.logging = true
    return this
  }

  disableLog() {
    this.logging = false
    return this
  }

  log(...msgs) {
    if (this.logging) {
      this.io.log('Lock', ...msgs)
    }
  }

  error(...msgs) {
    if (this.logging) {
      this.io.error('Lock', ...msgs)
    }
  }

  defaultCreateStore(keyNames, opts) {
    return new Store(keyNames, opts)
  }

  validate() {
    if (typeof config !== 'object') {
      throw Error('config must be an object')
    }

    if (!config.storage) {
      throw Error('missing storage config')
    }
    if (!config.gqlServer) {
      throw Error('missing gqlServer config')
    }
  }

}