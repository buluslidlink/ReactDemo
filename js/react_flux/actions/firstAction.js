/**
 * Created by weztt on 2016/12/17.
 */

import  AppDispatcher from  '../dispatcher/firstDispacther';
import $ from 'jquery';
export default class Child2Action {
    static clickHandler = ()=> {
        $.getJSON('https://api.github.com/search/repositories?q=javascript&sort=stars').then((value)=> {
            if (value) {
                AppDispatcher.dispatch({
                    actionType: 'getData',
                    data: JSON.stringify(value['total_count'])
                });
            }
        }).catch(err=> {
            alert(err);
            AppDispatcher.dispatch({
                actionType: 'getData_Error',
                error: err
            });
        });
    }
};