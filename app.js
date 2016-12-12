let koa = require('koa');
let app = koa();
let co = require('co');

app.use(function *() {
    this.body = "Hello World";
}).listen(8000);


