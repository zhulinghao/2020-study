'use strict'
const path = require("path");
const base = require("./webpack.config.base")


module.exports = {
  mode: 'production',
  output: {
    path: path.join(__dirname, 'dist'),
    filename: '[name]-[chunkhash:8].js'
  },
  /*
  // 开启监听模式
  watch: true,
  watchOptions: {
    // 默认空，不监听的文件或文件夹，可使用正则匹配
    ignored: '/node_modules/',
    // 单位毫秒，监听到变化会等300ms后再出执行重新编译
    aggregateTimeout: 300,
    // 判断文件是否发生变化通过轮训系统文件有没有变化实现，默认每秒1000次
    poll: 1000
  }
  */
  ...base
}