'use strict'
const path = require("path");
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')    // html
const MiniCssExtractPlugin = require('mini-css-extract-plugin');    // 提取出css文件
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');   // 压缩css文件
const { CleanWebpackPlugin } = require('clean-webpack-plugin');  // 在build之前先清空构建目录产物


module.exports = {
  mode: 'production',
  entry: {
    index: './src/index.js',
    search: './src/search.js',
  },
  output: {
    path: path.join(__dirname, 'dist'),
    filename: '[name]-[chunkhash:8].js'
  },
  // 概念：每一个loader都是一个方法，根据传入的参数返回相应的结果
  module: {
    rules: [
      { test: /\.js$/, use: 'babel-loader' },
      { 
        test: /\.css$/, 
        use: [
          MiniCssExtractPlugin.loader,
          // 'style-loader', // style-loader 把js字符串声成为style节点
          'css-loader',  // 把css解析成 commonjs 再传递给style-loader
          {
            loader: 'postcss-loader',
            options: {
              plugins: () => [
                require('autoprefixer')({
                  browsers: ['last 2 version', '>1%', 'ios 7']  //兼容使用大于1%的和浏览器最新版本的前两个版本
                })
              ]
            }
          }
        ] 
      },
      { 
        test: /\.less$/, 
        use: [
          MiniCssExtractPlugin.loader,
          // 'style-loader', // style-loader 把js字符串声成为style节点
          'css-loader',   // 把css转换成成 commonjs 再传递给style-loader
          'less-loader',   // 把less编译成css
          {
            loader: 'postcss-loader',
            options: {
              plugins: () => [
                require('autoprefixer')({
                  browsers: ['last 2 version', '>1%', 'ios 7']  //兼容使用大于1%的和浏览器最新版本的前两个版本
                })
              ]
            }
          }
        ] 
      },
      // 图片文件
      {
        test: /\.(png|jpg|gif)$/,
        use: [
          {
            // loader: 'url-loader',
            loader: 'file-loader',
            options: {
              // limit: 20480   // 小于20k的image文件都会转换成base64格式，储存在js缓存中，不需要发送http请求
              name: '[name]-[hash:8].[ext]'
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
    new CleanWebpackPlugin(),
    // 提取出css文件
    new MiniCssExtractPlugin({
      filename: '[name]-[contenthash:8].css'
    }),
    // 压缩css文件
    new OptimizeCssAssetsPlugin(),
    // index
    new HtmlWebpackPlugin({
      title: 'index',
      chunks: ['index'],
      inject: true
    }),
    // search 模板
    new HtmlWebpackPlugin({
      title: 'search Webpack',
      filename: 'search.html',
      chunks: ['search'],          // 指定chunk
      inject: true,
      template: 'public/search.html'
    })
  ]
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
}