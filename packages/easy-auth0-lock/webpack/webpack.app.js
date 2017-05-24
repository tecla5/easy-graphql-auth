let common = require('./webpack.common')
const BabiliPlugin = require('babili-webpack-plugin');
const merge = require('webpack-merge')

let config = merge.smart(common, {
  entry: {
    app: './src/app.js',
    polyfill: 'babel-polyfill',
  },
  output: {
    filename: '[name].js',
    library: 'createAuth0Lock',
    libraryTarget: 'umd',
    umdNamedDefine: true
  }
})

module.exports = config