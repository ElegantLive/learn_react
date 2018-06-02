// import React, { Component } from 'react';
// import logo from './logo.svg';
// import './App.css';
// import {createStore} from 'redux';
//
// class App extends Component {
//   render() {
//     return (
//       <div className="App">
//         <header className="App-header">
//           <img src={logo} className="App-logo" alt="logo" />
//           <h1 className="App-title">Welcome to React</h1>
//         </header>
//         <p className="App-intro">
//           To get started, edit <code>src/App.js</code> and save to reload.
//         </p>
//       </div>
//     );
//   }
// }
//
// export default App;

import React from 'react';
import {Button} from 'antd-mobile'
// import 'antd-mobile/dist/antd-mobile.css'

class App extends React.Component {
    render() {
        const boss = 'caiixan';
        return (
            <div>
                <h1>斗鱼,boss是{boss}</h1>
                <Children boss='卢本伟'></Children>
                <Theson boss='马飞'></Theson>
            </div>
        )
    }
}

function Theson(props) {
    return <h3>nice，{props.boss}！</h3>
}

class Children extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            solders: ['马飞', '卢本伟']
        };
        // this.addSolder = this.addSolder().bind(this);
    }
    componentWillMount()
    {
        console.log('组件prepare')
    }
    componentDidMount()
    {
        console.log('组件ok')
    }

    addSolder(){
        console.log('卢本伟牛逼！');
        this.setState({
            solders:[...this.state.solders,'观众老爷'+Math.random()]
        })
        // console.log([...this.state.solders])
    }

    render() {
        console.log('组件ing');
        // const boss = 'zhang';
        return (
            <div>
                <h2>{this.props.boss}，牛逼！</h2>
                <Button type='primary' onClick={()=>this.addSolder()}>加入直播间</Button>
                <ul>
                    {this.state.solders.map(v => {
                        return <li key={v}>{v}</li>
                    })}
                </ul>
            </div>
        )
    }
}

export default App;