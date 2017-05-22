let common = require('./webpack.common')
const BabiliPlugin = require('babili-webpack-plugin');
const merge = require('webpack-merge')

let config = merge.smart(common, {
  entry: './src/app.js',
  output: {
    filename: 'app.js',
    library: 'gcAuth0',
    libraryTarget: 'umd',
    umdNamedDefine: true
  }
})

module.exports = config