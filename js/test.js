/* **************************************************************
 * this file is part of My Project
 * Copyright @bulusli.
 *
 * Author      : LiHaiLong
 * Mail        : Weztt521@163.com
 * Create Date : 2016/12/15
 * Summary     : 
 *
 * *************************************************************/

// var $ = require('../bower_components/jquery/dist/jquery');
// module.exports = $('body');
if (debug) {
    alert($('body'));
    let a = ()=> {
        alert('zzzzzzzz');
    };
    module.exports = a;
} else if (release) {
    alert('release code');
}