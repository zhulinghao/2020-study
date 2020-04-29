const express = require("express");
const port = 54322;
const app = new express();

app.get('/', (req, res) => res.send('Hello World!'))

app.listen(port, () => console.log(`Example app listening on http://localhost:${port}`))
