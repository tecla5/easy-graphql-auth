require("babel-core/register");
require("babel-polyfill");

let {
  createLock
} = require('./dist/bundle')
console.log({
  createLock
})