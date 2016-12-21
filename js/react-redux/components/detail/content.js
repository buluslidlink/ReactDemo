/**
 * Created by weztt on 2016/12/21.
 */

import React, {Component} from  'react';

class Content extends Component {
    static PropTypes = {
        date: React.PropTypes.array
    }

    componentDidMount() {
        this.props.ctxAction(this.props.id);
    }

    render() {
        return (
            <article>
                <h1>{this.props.title}</h1>
                <span>----{this.props.date}</span>
                <p>{this.props.description}</p>
                <div></div>
            </article>
        )
    }
}

export default Content;