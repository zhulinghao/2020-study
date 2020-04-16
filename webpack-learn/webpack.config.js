'use strict'

const path = require("path");

module.exports = {
  entry: {
    index: './src/index.js',
    search: './src/search.js',
  },
  output: {
    path: path.join(__dirname, 'dist'),
    filename: '[name].js'
  },
  mode: 'production',
  // loader 配置
  module: {
    rules: [
      { test: /\.js$/, use: 'babel-loader' },
    ]
  },
  // plugins: {

  // }
}