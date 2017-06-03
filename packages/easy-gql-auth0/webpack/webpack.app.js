let common = require('./webpack.common')
const BabiliPlugin = require('babili-webpack-plugin');
const merge = require('webpack-merge')

let config = merge.smart(common, {
  entry: './src/app.js',
  output: {
    filename: 'app.js'
  }
})

module.exports = config