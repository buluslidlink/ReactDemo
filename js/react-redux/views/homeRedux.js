/* **************************************************************
 * this file is part of My Project
 * Copyright @bulusli.
 *
 * Author      : LiHaiLong
 * Mail        : Weztt521@163.com
 * Create Date : 2016/12/20
 * Summary     : 
 *
 * *************************************************************/
import {combineReducers} from 'redux';
import previewList from '../components/home/previewListRedux';
export default combineReducers({previewList});
export * as listAction from '../components/home/previewListRedux';