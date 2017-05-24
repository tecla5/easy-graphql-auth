var path = require('path');
var webpack = require('webpack');

module.exports = {
  entry: path.join(__dirname, '../src/index.js'),
  output: {
    path: path.resolve(__dirname, '../dist'),
    filename: 'bundle.js',
    library: 'easyAuth0Lock',
    libraryTarget: 'umd'
  },
  resolve: {
    extensions: ['.js'],
  },
  module: {
    rules: [{
      test: /\.js$/,
      exclude: /(node_modules|bower_components)/,
      use: {
        loader: 'babel-loader',
      }
    }]
  },
  stats: {
    colors: true
  },
  devtool: 'source-map'
};