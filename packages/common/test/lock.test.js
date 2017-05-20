import test from 'ava'
import {
  createLock,
  Lock
} from '../src/lock'

test('lock', t => {
  t.is(createLock, 'function')
  t.is(Lock, 'function')
})