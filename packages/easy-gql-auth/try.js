require("babel-core/register");
require("babel-polyfill");

let {
  GraphQLAuth,
  GraphQLConnection
} = require('./dist/bundle')
console.log({
  GraphQLAuth,
  GraphQLConnection
})