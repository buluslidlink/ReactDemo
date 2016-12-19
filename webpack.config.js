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
var cssLoader = 'css?modules&importLoaders=1&localIdentName=[path]___[name]__[local]___[hash:base64:5]';
var etp = require('extract-text-webpack-plugin');
module.exports = {
    entry: [
        'webpack-hot-middleware/client', //這隻檔案會連到 server 目的是當 server 重新編譯好檔案時收到通知然後更新 client 的檔案。
        './js/react_flux/components/firstComponent.js'
    ],
    output: {
        path: '/build',
        publicPath: '/file',
        name: 'bundle.js'
    },
    resolve: {
        extensions: ['', '.js', '.jsx', '.css', '.less']
    },
    module: {
        loaders: [{
            test: /\.js$/,
            include: [path.resolve(__dirname, 'js')],
            loaders: ['react-hot', 'babel']
        }, {
            test: /\.css/,
            include: [path.resolve(__dirname, 'css')],
            loader: etp.extract("style-loader", cssLoader)
        }]
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new etp("style.css"),
        new webpack.NoErrorsPlugin()
    ]
}

