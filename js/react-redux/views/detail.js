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
import {connect} from  'react-redux';
import {bindActionCreators} from  'redux';
import  Content from  '../components/detail/content';
import {detailAction} from './detailRedux';
class Detail extends Component {
    render() {
        const id = this.props.params.id;
        return (<Content {...this.props.contentState} id={id} {...this.props.cttAction}/>)
    }
}
export default connect((state)=> {
    return {contentState: state.detailReducer.contentReducer}
}, (dispatch)=> {
    return {cttAction: bindActionCreators(detailAction, dispatch)}
})(Detail);