// /**
//  * exports.Router = _Router3.default; /* components */
//
// exports.Link = _Link3.default;
// exports.IndexLink = _IndexLink3.default;
// exports.withRouter = _withRouter3.default;
//
// /* components (configuration) */
//
// exports.IndexRedirect = _IndexRedirect3.default;
// exports.IndexRoute = _IndexRoute3.default;
// exports.Redirect = _Redirect3.default;
// exports.Route = _Route3.default;
//
// /* utils */
//
// exports.RouterContext = _RouterContext3.default;
// exports.match = _match3.default;
// exports.useRouterHistory = _useRouterHistory3.default;
// exports.applyRouterMiddleware = _applyRouterMiddleware3.default;
//
// /* histories */
//
// exports.browserHistory = _browserHistory3.default;
// exports.hashHistory = _hashHistory3.default;
// exports.createMemoryHistory = _createMemoryHistory3.default;
//  */

/**
 * 组件名需要大写,小写时无法正确render
 * props:不变的属性，不可更改。
 * state:交互的属性，可以更改。\
 *
 * 如果链接到根路由/，不要使用Link组件，而要使用IndexLink组件。
 这是因为对于根路由来说，activeStyle和activeClassName会失效，或者说总是生效，因为/会匹配任何子路由。而IndexLink组件会使用路径的精确匹配。

 <IndexLink to="/" activeClassName="active">
 Home
 </IndexLink>
 上面代码中，根路由只会在精确匹配时，才具有activeClassName。
 另一种方法是使用Link组件的onlyActiveOnIndex属性，也能达到同样效果。

 <Link to="/" activeClassName="active" onlyActiveOnIndex={true}>
 Home
 </Link>
 实际上，IndexLink就是对Link组件的onlyActiveOnIndex属性的包装。
 *
 */
import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import {Link} from 'react-router';
import {Router, Route, hashHistory, browserHistory, IndexRoute} from  'react-router';

let Parent = React.createClass(
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
            this.setState({text: 'Parent changed'});
        },
        render(){
            return <span onClick={this.onClick} style={{color: this.state.color, display: this.state.display}}>
                {this.state.text}
                <h1>React Router Tutorial</h1>
                <ul role="nav">
                    <li><NavLink to="/child1" onlyActiveOnIndex>Child1</NavLink></li>
                    <li><NavLink to="/child2">Child2</NavLink></li>
                    <li><NavLink to="/repos/reactjs/react-router">React Router</NavLink></li>
                    <li><NavLink to="/repos/facebook/react">React</NavLink></li>
                </ul>
                {this.props.children}
                </span>
        }
    }
)

class Home extends Component {
    render() {
        return <div>Home Page</div>
    }
}

class Repos extends Component {
    render() {
        return (<ul>
            {/*<li><NavLink to="/repos/reactjs/react-router">React Router</NavLink></li>*/}
            {/*<li><NavLink to="/repos/facebook/react">React</NavLink></li>*/}
            {this.props.children}
        </ul>)
    }
}

class Repo extends Component {
    render() {
        return <h2>{this.props.params.proName}</h2>
    }
}

class NavLink extends Component {
    render() {
        return <Link {...this.props} activeClassName="active"/>
    }
}

class Child1 extends Component {
    constructor(props, context, updater) {
        super(props, context, updater);

    }

    static  propTypes = {value: React.PropTypes.number.isRequired}; //验证属性值是否符合格式，改成string则报错
    static defaultProps = {
        style: {color: 'red'},
        value: 0,
        text: 'child1'
    };

    render() {
        return (<p style={this.props.style} value={this.props.value}>{this.props.text}</p>);
    }
}

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
    <Router
        history={browserHistory}>{/*hashHistory表示URL的hash变化决定，即URL的#部分发生变化。browserHistory表示整个路径发生变化，会请求服务器，此时可以在webpack-dev-server启动时加上--history-api-fallback，表示404时返回到index.html页面。*/}
        <Route path='/'>
            <IndexRoute component={Home}/>
            <Route component={Parent} path='parent'>
                <Route component={Child1} path='/child1'/>
                <Route component={Child2} path='/child2'/>
                <Route component={Repos} path='/repos'>
                    <Route component={Repo} path='/repos/:proName/:conent'/>
                </Route>
            </Route>
        </Route>
    </Router>,
    document.getElementById('react1')
)