require("babel-core/register");
require("babel-polyfill");

let {
  GraphQLConnection
} = require('./dist/bundle')
console.log({
  GraphQLConnection
})