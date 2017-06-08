import test from 'ava'

import {
  Loggable
} from '../src/loggable'

const io = {
  log: (name, ...msgs) => {
    return msgs
  },
  error: (name, ...msgs) => {
    return msgs
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
  t.is(output[0], 'hello')
})

test('Loggable: error', t => {
  let output = loggable.error('err')
  t.is(output[0], 'err')
})