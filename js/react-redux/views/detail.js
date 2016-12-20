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
class Detail extends Component {
    render() {
        return <div>
            Detail Content {this.props.params.id}!!!!
        </div>
    }
}
export default Detail;