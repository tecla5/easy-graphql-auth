require('babel-core/register');
require('babel-polyfill');

let {
  GraphQLConnection
} = require('./dist/bundle.prod')
console.log({
  GraphQLConnection
})