/* **************************************************************
 * this file is part of My Project
 * Copyright @bulusli.
 *
 * Author      : LiHaiLong
 * Mail        : Weztt521@163.com
 * Create Date : 2016/12/12
 * Summary     : 
 *
 * *************************************************************/
/**
 * 必须在外面套一个元素，比如div
 */
let msgs = ['msg1', 'msg2', 'msg3'];
//ReactDOM.render(
// <div>{
//     msgs.map((msg)=> {
//         return <div>{msg}</div>
//     })
// }</div>,
// document.body  //不能这样写。提示报警
//)

/**
 * 直接定义在数组中。
 * @type {XML[]}
 */
let msg2 = [<div>fff</div>, <span>ttttt</span>];
let data = {name: 'foo', value: 'bar'};

class DataComponent extends React.Component {
    render() {
        return <span>name:{this.props.name},value:{this.props.value}</span>
    }
}

ReactDOM.render(
    <div>
        {msg2}
        <div style={{clear: 'both'}}></div>
        <DataComponent {...data}/> {/****用rest方式遍历数组**/}
    </div>,
    document.getElementById('react'),
//document.getElementById('react1')  //不能写两个
//   document.body
)

/**
 * Collection of methods that allow declaration and validation of props that are
 * supplied to React components. Example usage:
 *
 *   var Props = require('ReactPropTypes');
 *   var MyArticle = React.createClass({
 *     propTypes: {
 *       // An optional string prop named "description".
 *       description: Props.string,
 *
 *       // A required enum prop named "category".
 *       category: Props.oneOf(['News','Photos']).isRequired,
 *
 *       // A prop named "dialog" that requires an instance of Dialog.
 *       dialog: Props.instanceOf(Dialog).isRequired
 *     },
 *     render: function() { ... }
 *   });
 *
 * A more formal specification of how these methods are used:
 *
 *   type := array|bool|func|object|number|string|oneOf([...])|instanceOf(...)
 *   decl := ReactPropTypes.{type}(.isRequired)?
 *
 * Each and every declaration produces a function with the same signature. This
 * allows the creation of custom validation functions. For example:
 *
 *  var MyLink = React.createClass({
 *    propTypes: {
 *      // An optional string or URI prop named "href".
 *      href: function(props, propName, componentName) {
 *        var propValue = props[propName];
 *        if (propValue != null && typeof propValue !== 'string' &&
 *            !(propValue instanceof URI)) {
 *          return new Error(
 *            'Expected a string or an URI for ' + propName + ' in ' +
 *            componentName
 *          );
 *        }
 *      }
 *    },
 *    render: function() {...}
 *  });
 *
 var ReactPropTypes = {
  array: createPrimitiveTypeChecker('array'),
  bool: createPrimitiveTypeChecker('boolean'),
  func: createPrimitiveTypeChecker('function'),
  number: createPrimitiveTypeChecker('number'),
  object: createPrimitiveTypeChecker('object'),
  string: createPrimitiveTypeChecker('string'),
  symbol: createPrimitiveTypeChecker('symbol'),

  any: createAnyTypeChecker(),
  arrayOf: createArrayOfTypeChecker,
  element: createElementTypeChecker(),
  instanceOf: createInstanceTypeChecker,
  node: createNodeChecker(),
  objectOf: createObjectOfTypeChecker,
  oneOf: createEnumTypeChecker,
  oneOfType: createUnionTypeChecker,
  shape: createShapeTypeChecker
};

 var React = {
  Children: {
    map: ReactChildren.map,
    forEach: ReactChildren.forEach,
    count: ReactChildren.count,
    toArray: ReactChildren.toArray,
    only: onlyChild
  },
  Component: ReactComponent,
  PureComponent: ReactPureComponent,
  createElement: createElement,
  cloneElement: cloneElement,
  isValidElement: ReactElement.isValidElement,
  PropTypes: ReactPropTypes,
  createClass: ReactClass.createClass,
  createFactory: createFactory,
  createMixin: function (mixin) {
    // Currently a noop. Will be used to validate and trace mixins.
    return mixin;
  },

  // This looks DOM specific but these are actually isomorphic helpers
  // since they are just generating DOM strings.
  DOM: ReactDOMFactories,

  version: ReactVersion,

  // Deprecated hook for JSX spread, don't use this for anything.
  __spread: __spread
};

 */

var ReactClassInterface = {

    /**
     * An array of Mixin objects to include when defining your component.
     *
     * @type {array}
     * @optional
     */
    mixins: 'DEFINE_MANY',

    /**
     * An object containing properties and methods that should be defined on
     * the component's constructor instead of its prototype (static methods).
     *
     * @type {object}
     * @optional
     */
    statics: 'DEFINE_MANY',

    /**
     * Definition of prop types for this component.
     *
     * @type {object}
     * @optional
     */
    propTypes: 'DEFINE_MANY',

    /**
     * Definition of context types for this component.
     *
     * @type {object}
     * @optional
     */
    contextTypes: 'DEFINE_MANY',

    /**
     * Definition of context types this component sets for its children.
     *
     * @type {object}
     * @optional
     */
    childContextTypes: 'DEFINE_MANY',

    // ==== Definition methods ====

    /**
     * Invoked when the component is mounted. Values in the mapping will be set on
     * `this.props` if that prop is not specified (i.e. using an `in` check).
     *
     * This method is invoked before `getInitialState` and therefore cannot rely
     * on `this.state` or use `this.setState`.
     *
     * @return {object}
     * @optional
     */
    getDefaultProps: 'DEFINE_MANY_MERGED',

    /**
     * Invoked once before the component is mounted. The return value will be used
     * as the initial value of `this.state`.
     *
     *   getInitialState: function() {
   *     return {
   *       isOn: false,
   *       fooBaz: new BazFoo()
   *     }
   *   }
     *
     * @return {object}
     * @optional
     */
    getInitialState: 'DEFINE_MANY_MERGED',

    /**
     * @return {object}
     * @optional
     */
    getChildContext: 'DEFINE_MANY_MERGED',

    /**
     * Uses props from `this.props` and state from `this.state` to render the
     * structure of the component.
     *
     * No guarantees are made about when or how often this method is invoked, so
     * it must not have side effects.
     *
     *   render: function() {
   *     var name = this.props.name;
   *     return <div>Hello, {name}!</div>;
   *   }
     *
     * @return {ReactComponent}
     * @nosideeffects
     * @required
     */
    render: 'DEFINE_ONCE',

    // ==== Delegate methods ====

    /**
     * Invoked when the component is initially created and about to be mounted.
     * This may have side effects, but any external subscriptions or data created
     * by this method must be cleaned up in `componentWillUnmount`.
     *
     * @optional
     */
    componentWillMount: 'DEFINE_MANY',

    /**
     * Invoked when the component has been mounted and has a DOM representation.
     * However, there is no guarantee that the DOM node is in the document.
     *
     * Use this as an opportunity to operate on the DOM when the component has
     * been mounted (initialized and rendered) for the first time.
     *
     * @param {DOMElement} rootNode DOM element representing the component.
     * @optional
     */
    componentDidMount: 'DEFINE_MANY',

    /**
     * Invoked before the component receives new props.
     *
     * Use this as an opportunity to react to a prop transition by updating the
     * state using `this.setState`. Current props are accessed via `this.props`.
     *
     *   componentWillReceiveProps: function(nextProps, nextContext) {
   *     this.setState({
   *       likesIncreasing: nextProps.likeCount > this.props.likeCount
   *     });
   *   }
     *
     * NOTE: There is no equivalent `componentWillReceiveState`. An incoming prop
     * transition may cause a state change, but the opposite is not true. If you
     * need it, you are probably looking for `componentWillUpdate`.
     *
     * @param {object} nextProps
     * @optional
     */
    componentWillReceiveProps: 'DEFINE_MANY',

    /**
     * Invoked while deciding if the component should be updated as a result of
     * receiving new props, state and/or context.
     *
     * Use this as an opportunity to `return false` when you're certain that the
     * transition to the new props/state/context will not require a component
     * update.
     *
     *   shouldComponentUpdate: function(nextProps, nextState, nextContext) {
   *     return !equal(nextProps, this.props) ||
   *       !equal(nextState, this.state) ||
   *       !equal(nextContext, this.context);
   *   }
     *
     * @param {object} nextProps
     * @param {?object} nextState
     * @param {?object} nextContext
     * @return {boolean} True if the component should update.
     * @optional
     */
    shouldComponentUpdate: 'DEFINE_ONCE',

    /**
     * Invoked when the component is about to update due to a transition from
     * `this.props`, `this.state` and `this.context` to `nextProps`, `nextState`
     * and `nextContext`.
     *
     * Use this as an opportunity to perform preparation before an update occurs.
     *
     * NOTE: You **cannot** use `this.setState()` in this method.
     *
     * @param {object} nextProps
     * @param {?object} nextState
     * @param {?object} nextContext
     * @param {ReactReconcileTransaction} transaction
     * @optional
     */
    componentWillUpdate: 'DEFINE_MANY',

    /**
     * Invoked when the component's DOM representation has been updated.
     *
     * Use this as an opportunity to operate on the DOM when the component has
     * been updated.
     *
     * @param {object} prevProps
     * @param {?object} prevState
     * @param {?object} prevContext
     * @param {DOMElement} rootNode DOM element representing the component.
     * @optional
     */
    componentDidUpdate: 'DEFINE_MANY',

    /**
     * Invoked when the component is about to be removed from its parent and have
     * its DOM representation destroyed.
     *
     * Use this as an opportunity to deallocate any external resources.
     *
     * NOTE: There is no `componentDidUnmount` since your component will have been
     * destroyed by that point.
     *
     * @optional
     */
    componentWillUnmount: 'DEFINE_MANY',

    // ==== Advanced methods ====

    /**
     * Updates the component's currently mounted DOM representation.
     *
     * By default, this implements React's rendering and reconciliation algorithm.
     * Sophisticated clients may wish to override this.
     *
     * @param {ReactReconcileTransaction} transaction
     * @internal
     * @overridable
     */
    updateComponent: 'OVERRIDE_BASE'

};

/**
 * 组件名需要大写,小写时无法正确render
 * props:不变的属性，不可更改。
 * state:交互的属性，可以更改。
 *
 */
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

class Child1 extends React.Component {
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


/**
 *
 */
class Child2 extends React.Component {
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
        console.log('refs------------------->',this.refs.child2);
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

/**
 *  * 把元素当做json格式的文档
 * {
 * type:'TestCom'
 * }
 */
ReactDOM.render(
    <TestCom />,
    document.getElementById('react1')
)

const a = {d: 1, c: 2, b: 3};
console.log(...a, 'dddd');