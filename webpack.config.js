/* **************************************************************
 * this file is part of My Project
 * Copyright @bulusli.
 *
 * Author      : LiHaiLong
 * Mail        : Weztt521@163.com
 * Create Date : 2016/12/15
 * Summary     : webpack config js
 * Desc        :
 *              webpack原生直接支持AMD和CommonJS两种格式，
 *              ES6和React需要babel支持
 * *************************************************************/
var webpack = require('webpack');
var path = require('path');
var etp = require('extract-text-webpack-plugin');
module.exports = {
    entry: [
        'webpack-hot-middleware/client', //這隻檔案會連到 server 目的是當 server 重新編譯好檔案時收到通知然後更新 client 的檔案。
        // 'webpack-dev-server/client?http://0.0.0.0:8080', /*webpack-dev-server运行时，通过该脚本与资源服务器通信完成刷新，http参数表示可以跨域访问资源*/
        './js/test1.js', //必须这样写，不能写成js/test.js
        'jquery'
    ],
    output: {
        path: '/build',
        publicPath: '/file',
        name: 'bundle.js'
    },
    resolve: {
        extensions: ['', '.js', 'jsx']
    },
    module: {
        loaders: [{
            test: /\.jsx?$/,
            include: [path.resolve(__dirname, 'js')],
            // exclude: /node_modules/,
            loaders: ['react-hot', 'babel']
        },
            {
                test: /\.(css|less)$/,
                include: [path.resolve(__dirname, 'css')],
                //loader: 'style!css!less'
                loader: etp.extract('style', 'css', 'less')
            }
        ]
    },
    plugins: [
        //  new ExtractTextPlugin("style.css", {allChunks: true})
        new webpack.HotModuleReplacementPlugin(),
        new webpack.optimize.CommonsChunkPlugin('jquery', 'jquery.bundle.js'),
        new webpack.DefinePlugin({ //定义环境变量
            debug: !!process.env.dev,
            release: !!process.env.release
        }),
        new webpack.ProvidePlugin({ //定义别名，项目中直接引用，不需要import或者require
            //  'Moment': 'moment',
            "$": "jquery",
            "jQuery": "jquery",
            "window.jQuery": "jquery",
            "React": "react"
        }),
        new webpack.NoErrorsPlugin()
    ]
}



