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
const initDetailState = {
    title: '亲，你是石头生的？连名字都没有...',
    date: new Date().toString(),
    content: 'Oops,现在没有内容，你可以发挥你的天才写一篇哦~~'
};
const actionType = {
    GET_DETAIL: Symbol('getDetail')
}
export default function contentAction(id) {
    return {
        type: actionType.GET_DETAIL,
        para: {
            url: '/svr/detail/' + id,
            type: 'get',
            dataType: 'json'
        }
    }
}

export function contentReducer(state = initDetailState, action) {
    switch (action.type) {
        case actionType.GET_DETAIL: {
            return {...action.payload[0]};
        }
        default:
            return state
    }
}