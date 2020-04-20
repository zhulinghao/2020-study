const path = require('path')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    mode:'production',
    name: 'demo',
    entry:{
      main: path.resolve(__dirname, 'src/index.js') 
    },
    output:{
      path: path.join(__dirname, 'dist'),
      filename: '[name]-[contenthash:6].js',
      publicPath: '/',
    } ,
    optimization:{
      // moduleIds: 'hashed',
      runtimeChunk: 'single', // webpack自己的模板代码
      splitChunks:{
        cacheGroups:{
          thidrLibrary:{
            test:/node_modules/, //node_module里面的包的代码
            // minSize: 0, // 最低多少大小  才打包
            name: 'thirdLibary',
            chunks: 'all',
          },
          myLibary:{
            test:/lib/, // 自己自定义公共库的代码
            minSize: 0, // 我自己的库太小直接设置为0就是默认全打包
            name: 'myLib',
            chunks: 'all',
          }
        }
      }
    },
    plugins:[
      new CleanWebpackPlugin(),
      new HtmlWebpackPlugin({
        title: 'Caching'
      }),
    ]
  }