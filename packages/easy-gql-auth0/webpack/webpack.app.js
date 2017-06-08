let common = require('./webpack.common')
const merge = require('webpack-merge')

let config = merge.smart(common, {
  entry: './src/app.js',
  output: {
    filename: 'app.js'
  }
})

module.exports = config