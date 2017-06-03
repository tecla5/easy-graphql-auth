var path = require('path');
var webpack = require('webpack');

module.exports = {
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