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
import Nav from './nav';
class Frame extends Component {
    render() {
        return <div>
            <section>
                <Nav />
            </section>
            <section>
                {this.props.children}
            </section>
        </div>

    }
}

export default Frame;