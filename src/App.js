import React from 'react';
import { connect } from 'react-redux';
import {add, unfollow, addAsync} from "./index.redux";

// const mapStateToPross = (state)=>
// {
//     return {num: state}
// }
// const actionCreators = {add, unfollow, addAsync};
// App = connect(mapStateToPross, actionCreators)(App);
@connect(
    state=>({num:state.counter}),// 传输的state属性
    {add, unfollow, addAsync}// 传输的方法
)

class App extends React.Component {
    constructor(props){
        super(props)
    }
    render() {
        // const num = this.props.num;
        // const add = this.props.add;
        // const unfollow = this.props.unfollow;
        // const addAsync = this.props.addAsync;
        return (
            <div>
                <h1>关注人数{this.props.num}</h1>
                <button onClick={this.props.add}>加入直播间</button>
                <button onClick={this.props.unfollow}>离开直播间</button>
                <button onClick={this.props.addAsync}>2s--加入直播间</button>
            </div>
        )
    }
}


export default App;