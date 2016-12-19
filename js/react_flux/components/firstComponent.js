/* **************************************************************
 * this file is part of My Project
 * Copyright @bulusli.
 *
 * Author      : LiHaiLong
 * Mail        : Weztt521@163.com
 * Create Date : 2016/12/12
 * Summary     : first component for react
 *
 * *************************************************************/

/**
 * 组件名需要大写,小写时无法正确render
 * props:不变的属性，不可更改。
 * state:交互的属性，可以更改。
 *
 */
import React, {Component} from 'react';
import ReactDOM from  'react-dom';
import firstStyle from '../../../css/firstCss';
import {Container} from 'flux/utils';

let TestCom = React.createClass(
    {
        render(){
            let Child2_ = Container.create(Child2);
            return (<span><Child2_/></span>)
        }
    }
)

class Child1 extends Component {
    constructor(props, context, updater) {
        super(props, context, updater);

    }

    static  propTypes = {value: React.PropTypes.number.isRequired}; //验证属性值是否符合格式，改成string则报错
    static defaultProps = {
        style: {color: 'blue'},
        value: 0,
        text: 'child1'
    };

    render() {
        return (<p style={this.props.style} value={this.props.value}>{this.props.text}</p>);
    }
}


/**
 *
 */

import Child2Store from  '../stores/firstStore';
import  Child2Action from  '../actions/firstAction';

class Child2 extends Component {
    constructor(props, context, updater) {
        super(props, context, updater);
    }

    static getStores() {
        return [Child2Store];
    }

    static calculateState(prevState) {
        return Child2Store.getState()
    }

    clickHandler = (e)=> {
        e.stopPropagation();
        console.log('refs------------------->', this.refs.child2);
        Child2Action.clickHandler(e);
    };

    componentWillMount() {
        console.log('Child2 will mount');
    }

    componentDidMount() {
        let child2 = ReactDOM.findDOMNode(this);
        console.log(`Child2 did mount,content:${child2.innerHTML}`);
    }

    componentWillReceiveProps(nextProps) {
        console.log(`Child2 will receive props:${JSON.stringify(nextProps)}`);
    }

    shouldComponentUpdate(nextProps, nextState) {
        console.log(`Child2 should update,nextProps:${JSON.stringify(nextProps)},nextState:${JSON.stringify(nextState)}`);
        return true; //true表示重新渲染，false表示不需要重新渲染，改变了父组件的颜色，不需要重新渲染。
    }

    componentWillUpdate(nextProps, nextState) {
        console.log(`Child2 will update,nextProps:${JSON.stringify(nextProps)},nextState:${JSON.stringify(nextState)}`);
    }

    componentDidUpdate(prevProps, prevState) {
        let child2 = ReactDOM.findDOMNode(this);
        console.log(`Child2 did update,content:${child2.innerHTML}`);
        console.log(`Child2 did update,prevProps:${JSON.stringify(prevProps)},prevState:${JSON.stringify(prevState)}`);
    }

    componentWillUnmount() {
        console.log(`Child2 will unmount`);
    }

    render() {
        console.log(`state:${JSON.stringify(this.state)}`);
        return (
            <span ref='child2'>
            {this.state.text}
                <input type="button" value='get data' onClick={this.clickHandler}></input>
                {this.state.data}
                <div></div>
                <span>err:{this.state.err}</span>
        </span>);
    }
}


ReactDOM.render(
    <TestCom />,
    document.getElementById('react1')
);

alert('ffffff');