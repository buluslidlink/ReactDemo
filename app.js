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

var path = require('path');
var express = require('express');
var webpack = require('webpack');
var config = require('./webpack.config');
var compiler = webpack(config);
var app = express();
var compression = require('compression');
var isProd = (process.env.NODE_ENV === 'production');

if (isProd) {
    app.use(express.static(path.join(__dirname, 'build')));
    app.use(compression());
} else {
    var webpackDevOptions = {
        noInfo: false, //是否显示webpack的build详细信息
        historyApiFallback: true,
        publicPath: config.output.publicPath,
        headers: { //跨域资源访问
            'Access-Control-Allow-Origin': '*'
        }
    };
    app.use(require('webpack-dev-middleware')(compiler, webpackDevOptions));
    app.use(require('webpack-hot-middleware')(compiler));
}

app.use(require('./route/route.js'));

app.listen(8787, '0.0.0.0', function (err) {
    if (err) {
        console.log(err);
        return;
    }
    console.log('Listen http://localhost:8787');
});