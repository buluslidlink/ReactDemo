/**
 * Created by weztt on 2016/12/21.
 */

import $ from 'jquery';
const jqueryAjaxMiddleware = ()=>store=> {
    let dispatch = store.dispatch;
    let getState = store.getState;

    return next=>action=> {

        if (Object.is(typeof action, 'object')) {
            let para = action.para;
            if (para && para.url && Object.is(typeof para.url, 'string')) {
                console.log('@@ajax action:', action);
                return $.ajax(para).then((data)=> {
                    dispatch({type: action.type, payload: data});
                }).catch((err)=> {
                    dispatch({type: action.type, payload: err});
                });
            }
        }
        console.log('###########ajax next call#############');
        return next(action);
    }
}

export default jqueryAjaxMiddleware();