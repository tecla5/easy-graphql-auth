import test from 'ava'
import {
  setup
} from '../src/setup'

test('setup', t => {
  let {
    lock
  } = setup(config)
  t.is(lock, 'function')
})