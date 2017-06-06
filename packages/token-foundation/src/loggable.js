export class Loggable {
  constructor(name, opts = {}) {
    this.opts = opts
    this.io = opts.io || console
    this.logging = opts.logging
    this.name = name || opts.name
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
      this.io.log(this.name, ...msgs)
    }
  }

  error(...msgs) {
    if (this.logging) {
      this.io.error(this.name, ...msgs)
    }
  }
}