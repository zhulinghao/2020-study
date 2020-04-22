const MiniCssExtractPlugin = require('mini-css-extract-plugin');    // 提取出css文件
module.exports = {
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
              require('autoprefixer')
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
        {
          loader: 'postcss-loader',
          options: {
            plugins: () => [
              require('autoprefixer')
            ]
          }
        },
        // px改成rem适配移动端
        {
          loader: 'px2rem-loader',
          options: {
            remUnit: 75,   // 1rem = 75px
            remPrecision: 8  // px 转 rem后面小数点位数
          }
        },
        'less-loader',   // 把less编译成css
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
}