import test from 'ava'
import connector from '../src/connector'

test('connector', t => {
  t.is(typeof connector, 'function')
})