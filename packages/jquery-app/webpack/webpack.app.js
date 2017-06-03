const path = require('path')

let common = require('./webpack.common')
const BabiliPlugin = require('babili-webpack-plugin');
const merge = require('webpack-merge')

let config = merge.smart(common, {
  entry: [
    'babel-polyfill',
    path.join(__dirname, '../src/app.js')
  ],
  output: {
    filename: 'dist/app.js'
  }
})

module.exports = config