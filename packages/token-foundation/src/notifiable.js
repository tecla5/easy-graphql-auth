import {
  Loggable
} from './loggable'

export class Notifiable extends Loggable {
  constructor(name, opts) {
    super(name, opts)
    this.topic = opts.topic || this.defaultTopic
    this.notifyError = this.notifyFailure
    this.observers = {}
  }

  get defaultTopic() {
    return 'default'
  }

  notify(event, data) {
    let criteria = this._criteria(event, data, )
    this.publish(criteria, data)
  }

  _criteria(event, data, opts = {}) {
    return Object.assign({}, {
      topic: this.topic,
      event,
      data
    }, opts)
  }

  notifySuccess(event, data) {
    let criteria = this._criteria(event, data, {
      status: 'success'
    })
    this.publish(criteria, data)
  }

  notifyFailure(event, data) {
    let criteria = this._criteria(event, data, {
      status: 'failure'
    })
    this.publish(criteria, data)
  }

  onCriteria(criteria, observer) {
    this.log('onCriteria', criteria, observer)
    let {
      topic,
      event,
      status
    } = criteria
    topic = topic || this.topic
    this.observers[topic] = this.observers[topic] || {}
    this.observers[topic][event] = this.observers[topic][event] || {}

    let eventObservers = this.observers[topic][event]
    if (status) {
      eventObservers[status] = this.observers[topic][event][status] || []
      eventObservers[status] = eventObservers[status].concat(observer)
    } else {
      eventObservers['observers'] = eventObservers['observers'] || []
      eventObservers['observers'] = eventObservers['observers'].concat(observer)
    }
    return this
  }

  onStatus(event, status, observer) {
    let criteria
    if (typeof event === 'object') {
      criteria = event
    } else {
      criteria = {
        event
      }
    }
    criteria.status = status
    return this.onCriteria(criteria, observer)
  }

  onSuccess(criteria, observer) {
    return this.onStatus(criteria, 'success', observer)
  }

  onFailure(criteria, observer) {
    return this.onStatus(criteria, 'failure', observer)
  }

  on(event, observer) {
    this.log('on', event, observer)
    if (typeof event === 'object') {
      let criteria = event
      return this.onCriteria(criteria, observer)
    }
    let slot = this.observers[event] || []
    this.observers[event] = slot.concat(observer)
    return this
  }

  onAll(events, observer) {
    if (Array.isArray(events)) {
      events.map(event => this.on(event, observer))
      return this
    } else {
      this.handleError('onAll: first argument must be a list (Array) of events to observe', eventNames)
    }
  }

  publishCriteria(criteria, data) {
    this.log('publishCriteria', criteria, data)
    if (typeof criteria === 'string') {
      let event = criteria
      return this.publish(event, data)
    }
    let {
      topic,
      event,
      status
    } = criteria

    this.observers = this.observers || {}
    let observers = this.observers[topic] || {}
    observers = observers[event] || {}

    this.publishTo(observers['observers'], data, criteria)
    this.publishTo(observers[status], data, criteria)
  }

  publishTo(observers, data, criteria) {
    if (Array.isArray(observers)) {
      observers.map(observer => observer(data))
    } else {
      this.log('no observers registered for', criteria)
    }
    return this
  }

  publish(event, data) {
    this.log('publish', event, data)

    if (typeof event === 'object') {
      let criteria = this._criteria(event, data)
      this.publishCriteria(criteria, data)
    }

    this.observers = this.observers || {}
    let observers = this.observers[event] || []
    if (observers) {
      observers.map(observer => observer(data))
    } else {
      this.log('no observers registered for', event)
    }
    return this
  }
}
