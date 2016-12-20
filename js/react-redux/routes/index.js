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
import {Router, Route, browserHistory, IndexRoute} from 'react-router';
import Home from '../views/home';
import Frame from '../layouts/frame';
import Detail from '../views/detail';
// import Detail from '../views/detail';

export default routers => (
    <Router history={browserHistory}>
        <Route component={Frame} path='/'>
            <IndexRoute component={Home}/>
            <Route component={Detail} path='/detail/:id'/>
        </Route>
        {/*<Route component={Detail} path='detal/:id'/>*/}
    </Router>
)