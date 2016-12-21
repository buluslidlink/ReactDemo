/**
 * Created by weztt on 2016/12/21.
 */

const logMiddleware = ()=>store=> {
    let dispatch = store.dispatch;
    let getState = store.getState;

    return next=>action=> {
        console.log('@@log--state:', getState());
        next(action);
    }
}

export default logMiddleware();