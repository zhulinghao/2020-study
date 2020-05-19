const http = require('http');
const url = require('url');

let router = [{
  path: "*",
  method: "*",
  handler(req, res) {
    res.end(`Cannot ${req.method}_${req.url}`) 
  }
}]

class Application {
  constructor() {

  }

  get(path, handler) {
    router.push({
      path,
      method: 'get',
      handler
    })
  }
  
  listen() {
    const server = http.createServer((req, res) => {
      let { pathname } = url.parse(req.url, true);
      for(let i = 1;i < router.length;i ++){
        let { path, method, handler } = router[i]
        if (pathname == path && req.method.toLocaleLowerCase() == method){
          return handler(req,res)
        }
      }
      router[0].handler(req,res)
    })

    server.listen(...arguments);
  }
}

module.exports = Application;