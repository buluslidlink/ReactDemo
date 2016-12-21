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

    componentDidMount() {
        this.props.loadArticles();
    }

    render() {
        const {loading, error, articleList}=this.props;
        console.log('########render:', articleList);
        if (loading) {
            return <span>...Loading</span>
        }
        if (error) {
            return <span>OOPs,error happens.detail:{error}</span>
        }
        return (<div>{articleList.map((data)=>
            (<Preview {...data} key={data.id}/>)
        )}</div>)
    }
}
export default PreviewList;