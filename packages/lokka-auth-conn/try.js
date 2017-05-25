require("babel-core/register");
require("babel-polyfill");

let {
  Connection,
  createConnection
} = require('./dist/bundle')
console.log({
  Connection,
  createConnection
})