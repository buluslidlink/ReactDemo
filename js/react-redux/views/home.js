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
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {actions} from './homeRedux';
import PreviewList from '../components/home/previewList';

class Home extends Component {
    render() {
        return (
            <div>
                <h1>Home</h1>
                <PreviewList {...this.props.list} {...this.props.previewListAction}/>
            </div>
        )
    }
}

export default connect(state=> {
    return {list: state.homeReducer.previewList}
}, dispatch=> {
    return {
        previewListAction: bindActionCreators(actions, dispatch)
    }
})(Home);