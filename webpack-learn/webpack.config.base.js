'use strict'
const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')    // html
const MiniCssExtractPlugin = require('mini-css-extract-plugin');    // 提取出css文件
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');   // 压缩css文件
const { CleanWebpackPlugin } = require('clean-webpack-plugin');  // 在build之前先清空构建目录产物

const loaders = require('./loaders');
const glob = require("glob");

const setMPA = () => {
  const entry = {};
  const htmlWebpackPlugins = [];
  const entryFiles = glob.sync(path.join(__dirname, './src/pages/*/index.js'));
  entryFiles.forEach(eItem => {
    let match = eItem.match(/src\/pages\/(.*)\/index\.js/);
    const pageName = match && match[1];
    entry[pageName] = entryFiles;
    htmlWebpackPlugins.push(
      new HtmlWebpackPlugin({
        title: pageName,
        filename: `${pageName}.html`,
        chunks: [pageName],          // 指定chunk
        inject: true,
        template: `public/${pageName}.html`
      })
    )
  })
  return {
    entry, htmlWebpackPlugins
  }
}

const {entry, htmlWebpackPlugins} = setMPA();

console.log(glob.sync(path.join(__dirname, './src/pages/*/index.js')));

module.exports = {
  entry: entry,
  module: loaders,
  plugins: [
    new CleanWebpackPlugin(),
    // 提取出css文件
    new MiniCssExtractPlugin({
      filename: '[name]-[contenthash:8].css'
    }),
    // 压缩css文件
    new OptimizeCssAssetsPlugin()
  ].concat(htmlWebpackPlugins)
}