const express = require("express");
const port = 54322;
const app = new express();
const cors = require('./middleware/cors');

app.use(cors())

app.get('/get', (req, res) => {
  let { callback } = req.query;
  res.send(`${callback}(${port}, 'asdasd', 'wwee')`)
})
app.post('/post', (req, res) => res.send('test post'))

app.listen(port, () => console.log(`Example app listening on http://localhost:${port}`))