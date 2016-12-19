/* **************************************************************
 * this file is part of My Project
 * Copyright @bulusli.
 *
 * Author      : LiHaiLong
 * Mail        : Weztt521@163.com
 * Create Date : 2016/12/15
 * Summary     : webpack支持热部署方式
 *
 * *************************************************************/

/**
 * 启动两个服务器，webpack-dev-server作为静态资源服务器，nodejs作为http后台服务器，可以方便前后端分别调用。
 *
 * 1.在webpack.config.js的entry中加上webpack-dev-server/client?http://0.0.0.0:8080，在plugins中加上new webpack.HotModuleReplacementPlugin()。
 * 2.在nodejs的app.js中加上require('webpack-dev-server/bin/webpack-dev-server.js')，然后加上nodejs的http服务器代码。
 *
 */

//app.js中的代码
var defaultDevConfig = {
    "host": "localhost",
    "port": 8080,
    "publicPath": "http://127.0.0.1:8080/file",
    "outputPath": "/",
    "filename": "bundle.js",
    "watchOptions": {"aggregateTimeout": 200},
    "hot": false,
    "contentBase": "E:\\KoaAndReact",
    "stats": {
        "cached": false,
        "cachedAssets": false,
        "colors": {"level": 1, "hasBasic": true, "has256": false, "has16m": false},
        "context": "E:\\KoaAndReact"
    },
    "clientLogLevel": "info"
}
require('webpack-dev-server/bin/webpack-dev-server.js'); //启动dev server，默认监听8080端口。
var app = require('express');
app.use('/', function (req, res) {// req: http://localhost:8787  res:success
    res.send('success');
    //处理服务端逻辑
});
app().listen(8787, '0.0.0.0', function (err) { //启动后台服务http server。0.0.0.0表示整个网络。
    if (err) {
        console.log(err);
    }
});

//web.config.js中的配置
module.exports = {
    entry: [
        'webpack-dev-server/client?http://0.0.0.0:8080', /*webpack-dev-server运行时，通过该脚本与资源服务器通信完成刷新，http参数表示可以跨域访问资源*/
        './js/test.js' /*必须这样写，不能写成js/test.js*/
    ],
    output: {  //输出设置
        path: '/build', /*编译路径*/
        publicPath: 'http://127.0.0.1:8080/file', /*页面访问路径，必须显示指定url和端口，因为属于跨域资源访问*/
        name: 'bundle.js'
    },
    //xxxx
    plugins: [
        new webpack.HotModuleReplacementPlugin(), //必须加上
        new webpack.NoErrorsPlugin()
    ]
}


/**
 * 结合express框架，结合webpack的两个middleware，通过html5的EventSource进行hot部署，此时只有一个服务器，即nodejs的http server。
 */

//app.js中的代码

var path = require('path');
var express = require('express');
var webpack = require('webpack');
var config = require('./webpack.config');
var compiler = webpack(config);
var app = express();

var defaultDevOptions = {"watchOptions": {"aggregateTimeout": 200}, "stats": {"context": "E:\\KoaAndReact"}};
var webpackDevOptions = {
    noInfo: true, //是否显示webpack的build详细信息
    historyApiFallback: true,
    publicPath: config.output.publicPath,
    headers: { //跨域资源访问
        'Access-Control-Allow-Origin': '*'
    }
};


app.use('/svr', function (req, res) {  //服务请求
    res.send('success');
});

app.use(require('webpack-dev-middleware')(compiler, webpackDevOptions));
app.use(require('webpack-hot-middleware')(compiler));

app.get('/test', function (req, res) {//静态资源请求
    res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(8787, '0.0.0.0', function (err) {
    if (err) {
        console.log(err);
    }
});

//webpack.config

module.exports = {
    entry: [
        'webpack-hot-middleware/client?reload=true', //這隻檔案會連到 server 目的是當 server 重新編譯好檔案時收到通知然後更新 client 的檔案,reload表示重新加载，如果只有ES6的代码，需要加上这个，如果是react，可以不加。。
        './js/test1.js', //必须这样写，不能写成js/test.js
    ],
    output: {
        path: '/build',
        publicPath: '/file',
        name: 'bundle.js'
    },
    module: {
        loaders: [{
            test: /\.js$/,
            include: [path.resolve(__dirname, 'js')],
            loaders: ['babel']
        }]
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoErrorsPlugin()
    ]
}

//js中引入了css的情况，默认是作为内置style放在html中。可以通过extract-text-webpack-plugin提取js中的脚本，并合并为一个。

var etp = require('extract-text-webpack-plugin');
module.exports = {
    module: {
        loaders: [{
            test: /\.css/,
            include: [path.resolve(__dirname, 'css')],
            // exclude: /node_modules/,
            loader: etp.extract("style-loader", "css-loader")
        }]
    },
    plugins: [
        new etp("style.css")  //在页面中引入link标签，使用该css名称
    ]
}