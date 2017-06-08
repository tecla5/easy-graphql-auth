import test from 'ava'

import {
  Loggable
} from '../src/loggable'

function joined(label, msg, data) {
  return [label, msg, data].join(' ').trim()
}

const io = {
  log: joined,
  warn: joined,
  error: joined
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