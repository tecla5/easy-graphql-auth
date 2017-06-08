export class Loggable {
  constructor(name, opts = {}) {
    this.opts = opts
    this.io = opts.io || console
    this.logging = opts.logging
    this.name = name || opts.name
  }

  handleError(err, ...data) {
    this.error(err, ...data)
    if (this.notify) {
      this.notify('error', data)
    }
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

  warn(...msgs) {
    if (this.logging) {
      this.io.log('WARNING', this.name, ...msgs)
    }
  }

  log(...msgs) {
    if (this.logging) {
      return this.io.log(this.name, ...msgs)
    }
  }

  error(...msgs) {
    if (this.logging) {
      return this.io.error(this.name, ...msgs)
    }
  }
}