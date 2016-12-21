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
import {Link} from 'react-router';
class Preview extends Component {
    static propTypes = {
        title: React.PropTypes.string,
        link: React.PropTypes.string
    };

    render() {
        const path = `/detail/${this.props.id}`;
        return (
            <article>
                <Link to={path}>{this.props.title}</Link>
            </article>)
    }
}
export default Preview;