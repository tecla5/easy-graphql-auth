require("babel-core/register");
require("babel-polyfill");

let {
  createLock
} = require('./dist/bundle.prod')
console.log({
  createLock
})