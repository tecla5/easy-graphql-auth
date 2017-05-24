var path = require('path');
let common = require('./webpack.common')
const BabiliPlugin = require('babili-webpack-plugin');
const merge = require('webpack-merge')

let config = merge.smart(common, {
  entry: path.resolve(__dirname, '../src/app.js'),
  output: {
    filename: 'app.js',
    library: 'easyAuth0',
    libraryTarget: 'umd',
    umdNamedDefine: true
  }
})

module.exports = config