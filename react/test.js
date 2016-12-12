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
ReactDOM.render(
    <div>{msg2}</div>,
    document.getElementById('react'),
    //document.getElementById('react1')  //不能写两个
    //   document.body
)

/**
 * 组件名需要大写,小写时无法正确render
 *
 */
let TestCom = React.createClass(
    {
        render(){
            return <span
                style={this.props.children[0].props.style}>{this.props.text},{this.props.children[1].props.children}</span>
        }
    }
)

/**
 *  * 把元素当做json格式的文档
 * {
 * type:'TestCom'
 * }
 */
ReactDOM.render(
    <TestCom text='mmmm'>
        <p style={{color: 'red'}}>pppppp</p>
        <span >ssssss</span>
    </TestCom>,
    document.getElementById('react1')
)