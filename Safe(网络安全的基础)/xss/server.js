const app = require('express')()
const path = require('path')
const fs = require('fs')


app.get('/', (req, res) => {
  res.sendFile(path.resolve(__dirname, './index.html'))
})

app.get('/search', (req, res) => {
  const query = req.query
  const q = query.q
  res.setHeader('Content-Type', 'text/html;charset=UTF-8')
  res.write(`<h1>搜索结果是：</h1> <div>${q}</div>  `)
})

app.listen(8001)