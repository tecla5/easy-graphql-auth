export class FakeAuth0Lock {
  constructor(clientId, domain, opts = {}) {
    this.clientId = clientId
    this.domain = domain
    this.opts = opts
  }

  show(displayConfig) {
    console.log('show', displayConfig)
  }

  on(event, cb) {
    cb(this.fakeAuthResult)
  }

  get fakeAuthResult() {
    return {
      user: 'kris',
      idToken: 'xxx'
    }
  }
}
