import test from 'ava'

import {
  Notifiable
} from '../src/notifiable'

let notifiable
test.before(t => {
  notifiable = new Notifiable('Notifiable', {
    // logging: true
  })
})

test('Notifiable: subscribe observer', t => {
  let observer = (data) => {
    t.is(data, 'hi')
  }

  notifiable.on('hello', observer)
  let observers = notifiable.observers['hello']
  t.is(observers[0], observer)
})

test('Notifiable: subscribe to and publish event', t => {
  let observer = (data) => {
    t.is(data, 'hi')
  }

  notifiable.on('hello', observer)
  notifiable.publish('hello', 'hi')
})

test('Notifiable: subscribe to and publish topic/event', t => {
  let observer = (data) => {
    t.is(data, 'hi')
  }

  let criteria = {
    topic: 'say',
    event: 'hello'
  }
  notifiable.on(criteria, observer)
  notifiable.publish(criteria, 'hi')
})

test('Notifiable: subscribe to and publish topic/event status:error', t => {
  let observer = (data) => {
    t.is(data, 'hi')
  }

  let criteria = {
    topic: 'say',
    event: 'hello',
    status: 'error'
  }
  notifiable.on(criteria, observer)
  notifiable.publish(criteria, 'hi')
})

test('Notifiable: subscribe to and notify success', t => {
  let observer = (data) => {
    t.is(data, 'hi')
  }

  notifiable.onSuccess('hello', observer)
  notifiable.notifySuccess('hello', 'hi')
})

test('Notifiable: subscribe to and notify failure', t => {
  let observer = (data) => {
    t.is(data, 'hi')
  }

  notifiable.onFailure('hello', observer)
  notifiable.notifyFailure('hello', 'hi')
})

test('Notifiable: publishCriteria string', t => {
  let observer = (data) => {
    t.is(data, 'hi')
  }
  notifiable.on('hello', observer)
  notifiable.publishCriteria('hello', 'hi')
})

test('Notifiable: publishCriteria object', t => {
  let observer = (data) => {
    t.is(data, 'hi')
  }
  notifiable.on('hello', observer)
  notifiable.publishCriteria({
    event: 'hello'
  }, 'hi')
})

test('Notifiable: notify', t => {
  let observer = (data) => {
    t.is(data, 'hi')
  }
  notifiable.on('hello', observer)
  notifiable.notify('hello', 'hi')
})


test('Notifiable: onStatus object', t => {
  let observer = (data) => {
    t.is(data, 'hi')
  }
  notifiable.onStatus({
    event: 'hello',
    status: 'success'
  }, observer)

  notifiable.publishCriteria({
    event: 'hello',
    status: 'success'
  }, 'hi')
})


test('Notifiable: onAll - not array', t => {
  let observer = (data) => {
    t.is(data, 'hi')
  }
  try {
    notifiable.onAll('bye', observer)
  } catch (err) {
    t.pass('not an array of event')
  }
})

test('Notifiable: onAll', t => {
  let observer = (data) => {
    t.is(data, 'hi')
  }
  notifiable.onAll(['hello', 'bye'], observer)

  notifiable.publishCriteria({
    event: 'hello'
  }, 'hi')

  notifiable.publishCriteria('bye', 'hi')
})
