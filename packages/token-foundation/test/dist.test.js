import 'babel-polyfill'
import test from 'ava'
import bundle, {
  Store,
  Configurable
} from '../dist/bundle.js'

console.log({
  bundle
})

test('Configurable', t => {
  t.is(typeof Configurable, 'function')
})

test('Store', t => {
  t.is(typeof Store, 'function')
})