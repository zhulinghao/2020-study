'use strict'
const path = require("path");
const HtmlWebpackPlugin = require('html-webpack-plugin')
const webpack = require('webpack')

module.exports = {
  entry: {
    index: './src/index.js',
    search: './src/search.js',
  },
  output: {
    path: path.join(__dirname, 'dist'),
    filename: '[name]-[hash:8].js'
  },
  mode: 'production',
  // mode: 'development',
  // loader 配置
  // 概念：每一个loader都是一个方法，根据传入的参数返回相应的结果
  module: {
    rules: [
      { test: /\.js$/, use: 'babel-loader' },
      { 
        test: /\.css$/, 
        use: [
          'style-loader', // style-loader 把js字符串声成为style节点
          'css-loader'  // 把css解析成 commonjs 再传递给style-loader
        ] 
      },
      { 
        test: /\.less$/, 
        use: [
          'style-loader', // style-loader 把js字符串声成为style节点
          'css-loader',   // 把css转换成成 commonjs 再传递给style-loader
          'less-loader'   // 把less编译成css
        ] 
      },
      // 图片文件
      {
        test: /\.(png|jpg|gif)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 20480   // 小于20k的image文件都会转换成base64格式，储存在js缓存中，不需要发送http请求
            }
          }
        ]
      },
      // 字体解析
      {
        test: /\.(woff|woff2|eot|tff|otf)$/,
        use: [
          {
            loader: 'file-loader',
            options: {}
          }
        ]
      }
    ]
  },
  plugins: [
    // 热更新
    new webpack.HotModuleReplacementPlugin(),
    // html 模板
    new HtmlWebpackPlugin({
      title: 'Learn Webpack',
      filename: 'index.html',
      template: 'public/index.html'
    })
  ],
  // 热更新
  devServer: {
    contentBase: "./dist",
    hot: true,
    port: 54323
  }
}