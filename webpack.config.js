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
var is_env_dev = (process.env.NODE_ENV === 'development');
var FileListPlugin = require('./js/plugin/testPlugin');
console.log('is_env_dev:', is_env_dev);
module.exports = is_env_dev ?
{
    entry: [
        'webpack-hot-middleware?client',
        './js/react-redux/app.js' //必须这样写，不能写成js/test.js
    ],
    output: {
        path: '/build', //`output.path` needs to be an absolute path or `/`.
        publicPath: '/static',
        filename: 'bundle.js'
    },
    resolve: {
        extensions: ['', '.js', 'jsx']
    },
    module: {
        loaders: [{
            test: /\.jsx?$/,
            include: [path.resolve(__dirname, 'js')],
            // exclude: /node_modules/,
            loaders: (['react-hot', 'babel'])
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
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoErrorsPlugin(),
        new FileListPlugin(),
        new webpack.DefinePlugin({
            __DEV__: true,
            __PRERELEASE__: false
        })
    ]
} :
{
    entry: [
        './js/react-redux/app.js' //必须这样写，不能写成js/test.js
    ],
    output: {
        path: 'build',
        publicPath: '/build',
        filename: 'bundle.js'
    }
    ,
    resolve: {
        extensions: ['', '.js', 'jsx']
    }
    ,
    module: {
        loaders: [{
            test: /\.jsx?$/,
            include: [path.resolve(__dirname, 'js')],
            loaders: ( ['babel'])
        },
            {
                test: /\.(css|less)$/,
                include: [path.resolve(__dirname, 'css')],
                //loader: 'style!css!less'
                loader: etp.extract('style', 'css', 'less')
            }
        ]
    }
    ,
    plugins: [
        new webpack.optimize.DedupePlugin(),
        new webpack.optimize.OccurrenceOrderPlugin(),
     //   new FileListPlugin(),
        //   new webpack.optimize.UglifyJsPlugin(),
        new webpack.DefinePlugin({
            __DEV__: false,
            __PRERELEASE__: true
        })
    ]
}

