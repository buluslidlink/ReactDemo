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
    loading: true,
    error: false,
    articleList: []
}

const LOAD_ARTICLES = 'LOAD_ARTICLES';
const LOAD_ARTICLES_SUCCESS = 'LOAD_ARTICLES_SUCCESS';
export function loadArticles() {
    return {
        types: [LOAD_ARTICLES, LOAD_ARTICLES_SUCCESS],
        url: '/svr'
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
                ...state,
                loading: false,
                error: false,
                articleList: action.articleList
            }
        }
        default: {
            return state;
        }
    }
}