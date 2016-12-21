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

const initialState = {
    articleList: []
}
const LOAD_ARTICLES = 'LOAD_ARTICLES';
const LOAD_ARTICLES_SUCCESS = 'LOAD_ARTICLES_SUCCESS';
const LOAD_ARTICLES_ERROR = 'LOAD_ARTICLES_ERROR';
import $ from 'jquery';
export function loadArticles() {
    // return {
    //     type: LOAD_ARTICLES,
    //     url: '/svr'
    // }
    return function (dispatch, getState) {
        $.ajax({
            url: '/svr',
            type: 'get',
            dataType: 'json'
        }).then((data)=> {
            dispatch({type: LOAD_ARTICLES_SUCCESS, payload: {data}});
        }).catch((err)=> {
            dispatch({type: LOAD_ARTICLES_ERROR, payload: err});
        });
    }
}

export default function previewList(state = initialState, action) {
    switch (action.type) {
        case LOAD_ARTICLES: {
            return {
                ...state,
                loading: true,
                error: false
            }
        }
        case LOAD_ARTICLES_SUCCESS: {
            return {
                articleList: action.payload.data,
                loading: false,
                error: false
            }
        }
        case LOAD_ARTICLES_ERROR: {
            return {
                articleList: [],
                loading: false,
                error: action.payload.err
            }
        }
        default: {
            return state;
        }
    }
}