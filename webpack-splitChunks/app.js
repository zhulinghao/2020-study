const app = require('express')()
const path = require('path')
const webpack = require('webpack')
const webpackHotMiddleware = require('webpack-hot-middleware')
const webpackDevMiddleware = require('webpack-dev-middleware')

const config = require('./config.js.js')

const compler = webpack(config)

app.use(webpackDevMiddleware(compler, {
  publicPath: '/',
  stats:{
    colors: true,
  },
  writeToDisk: true,
}))
app.use(webpackHotMiddleware(compler))

app.get('/:page', (req, res, next) => {
  const pagename = req.params.page ? req.params.page + '.html' : 'index.html'
  const filePath = path.join(compler.outputPath, pagename)
  compler.outputFileSystem.readFile(filePath, (err, result) => {
    if(err){
      console.log('路径无效')
      return next()
    }

    res.set('content-type', 'text/html')
    res.send(result)
    res.end()
  })

})


app.listen(3000, function(){
  console.log('server start on 3000')
})