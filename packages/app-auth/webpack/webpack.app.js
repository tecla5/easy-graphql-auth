var path = require('path');
let common = require('./webpack.common')
const BabiliPlugin = require('babili-webpack-plugin');
const merge = require('webpack-merge')

let config = merge.smart(common, {
  entry: path.resolve(__dirname, '../src/index.js'),
  output: {
    filename: 'app-auth.js',
    library: 'app-auth',
    libraryTarget: 'umd',
    umdNamedDefine: true
  }
})

module.exports = config
