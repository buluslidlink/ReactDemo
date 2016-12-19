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
import firstStyle from '../../css/firstCss';
import $ from 'jquery';

let TestCom = React.createClass(
    {
        getDefaultProps(){
            return {color: 'green', text: 'Parent'};
        },
        getInitialState(){
            return {color: 'green', text: 'Parent', display: 'block'};
        },
        onClick(e){
            console.log(e.target);
            //this.props.text = '2222';//报错，不能更改props。
            this.setState({color: 'yellow', text: 'Parent changed', display: 'none'});

        },
        render(){
            return <span onClick={this.onClick} style={{color: this.state.color, display: this.state.display}}>
                {this.state.text}
                <Child1/>
                <Child2/>
            </span>
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
class Child2 extends Component {
    constructor(props, context, updater) {
        super(props, context, updater);
        this.state = {
            text: 'child2'
        };
    }

    static defaultProps = {
        getData: ()=> {
            return $.getJSON('https://api.github.com');
        }
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
        return nextState.text !== this.state.text; //true表示重新渲染，false表示不需要重新渲染，改变了父组件的颜色，不需要重新渲染。
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

    clickHandler = (e)=> {//箭头函数绑定this。
        e.stopPropagation();
        console.log('refs------------------->', this.refs.child2);
        this.props.getData().then((data)=> {
            this.setState({text: JSON.stringify(data['current_user_authorizations_html_url'])});
        }).catch(err=> {
            this.setState({text: JSON.stringify(err)});
        });
        //this.refs.child2.remove();//可以直接移除
    }

    render() {
        return (<span ref='child2'>
            {this.state.text}
            <input type="button" value='get data' onClick={this.clickHandler}></input>
        </span>);
    }
}


ReactDOM.render(
    <TestCom />,
    document.getElementById('react1')
);

alert('ffffff');