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
import React, {Component} from 'react';
import {Link} from  'react-router';
class Nav extends Component {
    render() {
        return <div>
            <h1><Link to='/'>Home</Link></h1>
            <h1><Link to='/detail/1'>1</Link></h1>
            <h1><Link to='/detail/2'>2</Link></h1>
            <h1><Link to='/detail/3'>3</Link></h1>
        </div>
    }
}

export default Nav;