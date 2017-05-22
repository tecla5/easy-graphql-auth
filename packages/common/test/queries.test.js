import test from 'ava'
import {
  createUser,
  signinUser
} from '../src/queries'

test('queries', t => {
  t.is(createUser, 'function')
  t.is(signinUser, 'function')
})