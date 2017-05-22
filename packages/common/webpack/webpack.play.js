let common = require('./webpack.common')
const BabiliPlugin = require('babili-webpack-plugin');
const merge = require('webpack-merge')

let config = merge.smart(common, {
  entry: {
    polyfill: 'babel-polyfill',
    play: './src/play.js'
  },
  output: {
    filename: '[name].js'
  }
})

module.exports = config