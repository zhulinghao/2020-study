'use strict'
const path = require("path");
const base = require("./webpack.config.base")
const HtmlWebpackExternalsPlugin = require('html-webpack-externals-plugin')   // 可以用来不打包某些核心插件，选用cdn替换

module.exports = {
  mode: 'production',
  output: {
    path: path.join(__dirname, 'dist'),
    filename: '[name]-[contenthash:8].js'
  },
  plugins: [
    /*
    new HtmlWebpackExternalsPlugin({
      externals: [
        {
          module: 'react',
          entry: 'https://cdnjs.cloudflare.com/ajax/libs/react/16.13.1/umd/react.production.min.js',
          global: 'React',
        },
        {
          module: 'react-dom',
          entry: 'https://cdnjs.cloudflare.com/ajax/libs/react-dom/16.13.1/umd/react-dom.production.min.js',
          global: 'ReactDOM',
        },
      ],
      hash: true,
      files: [
        `${'search'}.html` // 这里要指定html 不然还是会多次注入
      ]
    })*/
  ].concat(base.plugins),
  optimization: {
    splitChunks: {
      // async：异步引入的库进行分离（默认）， initial： 同步引入的库进行分离， all：所有引入的库进行分离（推荐）
      //chunks: 'async',
      // minSize: 30000, // 抽离的公共包最小的大小，单位字节
      //maxSize: 0, // 最大的大小
      // minChunks: 1, // 资源使用的次数(在多个页面使用到)， 大于1， 最小使用次数
      // maxAsyncRequests: 5, // 并发请求的数量
      //maxInitialRequests: 3, // 入口文件做代码分割最多能分成3个js文件
      //automaticNameDelimiter: '~', // 文件生成时的连接符
      //automaticNameMaxLength: 30, // 自动自动命名最大长度
      name: true, //让cacheGroups里设置的名字有效
      cacheGroups: { //当打包同步代码时,上面的参数生效
        vendors: {
          test: /node_modules/, //检测引入的库是否在node_modlues目录下的
          priority: -10, //值越大,优先级越高.模块先打包到优先级高的组里
          name: 'vendors',//把所有的库都打包到一个叫vendors的文件里
          chunks: 'all'
        },
        default: {
          minChunks: 2, // 上面有
          priority: -20, // 上面有
          reuseExistingChunk: true //如果一个模块已经被打包过了,那么再打包时就忽略这个上模块
        }
      }
    }
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
  entry: base.entry,
  module: base.module,
}