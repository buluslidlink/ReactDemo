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

import React from 'react';
import ReactDOM from 'react-dom';
import configStore from './redux/configStore';
import {Provider} from 'react-redux';
import {syncHistoryWithStore} from  'react-router-redux';
import {browserHistory} from 'react-router';
import routers from './routes';

const store = configStore();
const history = syncHistoryWithStore(browserHistory, store);
ReactDOM.render((
    <Provider store={store}>
        {routers(history)}
    </Provider>
), document.getElementById('root'));