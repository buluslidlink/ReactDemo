/**
 * Created by weztt on 2016/12/19.
 */
var express = require('express');
var router = express.Router();
var path = require('path');

router.use('/svr', function (req, res) {
    res.send('success');
})

router.use('*', function (req, res) {
    console.log('req uri:', req.url);
    var isDev = (process.env.NODE_ENV === 'development');
    res.sendFile(path.resolve(__dirname, isDev ? '../index.html' : '../build/index.html')); //resolve把最后一个参数所在的路径解析成绝对路径。此处..表示__dirname的上一级路径下的build/index.html文件。
})

module.exports = router;