require("babel-core/register");
require("babel-polyfill");

let {
  setup,
  Lock,
  createLock,
  Store,
  createStore
} = require('./dist/bundle')
console.log({
  setup,
  Lock,
  createLock,
  Store,
  createStore
})