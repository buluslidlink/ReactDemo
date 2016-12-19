var path = require('path');
var express = require('express');
var webpack = require('webpack');
var config = require('./webpack.config');

// var path = require(`path`);
// var express = require(`express`);
// var webpack = require(`webpack`);
// var config = require(`./webpack.config`);
// var compiler = webpack(config);
// var app = express();
//
// var webpackDevOptions = {
//     historyApiFallback: true,//browserHistory时，显示正常的路径example.com/some/path，背后调用的是浏览器的History API。但是，这种情况需要对服务器改造。否则用户直接向服务器请求某个子路由，会显示网页找不到的404错误。
//     publicPath: config.output.publicPath,
//     header: {
//         'Access-Control-Allow-Origin': '*'
//     }
// };
//
// app.use(`/svr`, function (req, res) {
//     res.send(`success`);
// });
// //app.use(express.static(path.resolve(__dirname,`js`)));
// app.use(require(`webpack-dev-middleware`)(compiler, webpackDevOptions));
// app.use(require(`webpack-hot-middleware`)(compiler));
//
// app.use(`*`, function (req, res) {
//     res.sendFile(path.join(__dirname, `index.html`));
// });
//
// app.listen(8787, `0.0.0.0`, function (err) {
//     if (err) {
//         console.log(err);
//     }
// });

var express = require('express');
var path = require('path');
var compression = require('compression');

var app = express();

app.use(compression());

// serve our static stuff like index.css
app.use(express.static(path.join(__dirname, 'build')));

// send all requests to index.html so browserHistory works
app.get('*', function (req, res) {
    res.sendFile(path.join(__dirname, 'index.html'))
})

var PORT = process.env.PORT || 8080
app.listen(PORT, function () {
    console.log('Production Express server running at localhost:' + PORT)
})
