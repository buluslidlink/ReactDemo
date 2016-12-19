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
import funcA,{obj} from './test';
funcA(); //相当于调用module.exports.default属性。
alert(JSON.stringify(obj)); //obj为module.exports.obj属性。