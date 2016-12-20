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
import Preview from './preview';

class PreviewList extends Component {
    static propTypes = {
        articleList: React.PropTypes.arrayOf(React.PropTypes.object)
    }

    render() {
        return (
            <ul>
                {
                    this.props.articleList.map((data)=> {
                        <li><Preview {...data} key={data.id}/></li>
                    })
                }
            </ul>
        );
    }
}
export default PreviewList;