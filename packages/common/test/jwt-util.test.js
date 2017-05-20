import test from 'ava'
import {
  getTokenExpirationDate,
  isTokenExpired
} from '../src/jwt-util'

test('jwtUtil', t => {
  t.is(getTokenExpirationDate, 'function')
  t.is(isTokenExpired, 'function')
})