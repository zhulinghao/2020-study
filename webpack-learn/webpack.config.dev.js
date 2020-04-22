'use strict'
const path = require("path");
const base = require("./webpack.config.base")
const webpack = require("webpack")

module.exports = {
  mode: 'development',
  output: {
    path: path.join(__dirname, 'dist'),
    filename: '[name].js'
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
  ].concat(base.plugins),
  // 热更新
  devServer: {
    // contentBase: "./dist",
    hot: true,
    port: 54323
  },
  entry: base.entry,
  module: base.module
}