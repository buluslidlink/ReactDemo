/* **************************************************************
 * this file is part of My Project
 * Copyright @bulusli.
 *
 * Author      : LiHaiLong
 * Mail        : Weztt521@163.com
 * Create Date : 2016/12/21
 * Summary     : 
 *
 * *************************************************************/

import {createStore, combineReducers, compose, applyMiddleware} from 'redux';
import ThunkMiddleware from 'redux-thunk';
import {routerReducer} from  'react-router-redux';
import reducer from './reducers';
/**
 * compose函数的意义：从右向左reduce执行里面的函数。
 * return function () { return rest.reduceRight(function (composed, f) {
                                return f(composed);}, last.apply(undefined, arguments)); };
 */
const customCreateStore = compose(
    applyMiddleware(  //该函数会将所有的middleware加入到数组中，并且返回一个function(createStore){ return function(reducer, preloadedState, enhancer){}},该函数会创建store，并且链式调用middleware所在的函数。
        ThunkMiddleware  //thunk函数可以传入一个action，根据action的类型：function（异步）或者对象（同步）进行不同的操作。function时不会执行middleware链。
    ))(createStore);

const reducers = combineReducers(Object.assign({}, reducer, {routing: routerReducer}));

export default function configStore(initState) {
    return customCreateStore(reducers, initState);
}


