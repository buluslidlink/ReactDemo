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
import ctxAction, {contentReducer} from '../components/detail/contentRedux';
export default combineReducers({contentReducer});
export const detailAction = {
    ctxAction
}
