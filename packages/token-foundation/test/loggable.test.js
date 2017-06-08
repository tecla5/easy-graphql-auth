import test from 'ava'

import {
  Loggable
} from '../src/loggable'

const io = {
  log: (name, ...msgs) => {
    return [name, msgs].join(' ')
  },
  error: (name, ...msgs) => {
    return [name, msgs].join(' ')
  }
}

let loggable
test.before(t => {
  loggable = new Loggable('Loggable', {
    io,
    logging: true
  })
})

test('Loggable: log', t => {
  let output = loggable.log('hello')
  t.is(output, '[Loggable] INFO: hello')
})

test('Loggable: warn', t => {
  let output = loggable.warn('hello')
  console.log({
    output
  })
  t.is(output, '[Loggable] WARNING: hello')
})

test('Loggable: error', t => {
  let output = loggable.error('err')
  t.is(output, '[Loggable] ERROR: err')
})

test('Loggable: enableLog/disableLog', t => {
  loggable.disableLog()
  let disabled = loggable.log('hello')
  t.is(disabled, undefined)

  loggable.enableLog()
  let output = loggable.log('hello')
  t.is(output, '[Loggable] INFO: hello')
})