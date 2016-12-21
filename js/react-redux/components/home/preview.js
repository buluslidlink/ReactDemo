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
class Preview extends Component {
    static propTypes = {
        title: React.PropTypes.string,
        link: React.PropTypes.string
    };

    render() {
        return (
            <article>
                <Link path='/'>{this.props.title}</Link>
                <span>{this.props.date}</span>
                <p>{this.props.description}</p>
            </article>)
    }
}
export default Preview;