import React from 'react';
import {Button,List} from 'antd-mobile';
import 'antd-mobile/dist/antd-mobile.css';

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
    }

    componentWillMount() {
        console.log('组件prepare')
    }

    componentDidMount() {
        console.log('组件ok')
    }

    addSolder() {
        console.log('卢本伟牛逼！');
        this.setState({
            solders: [...this.state.solders, '观众老爷' + Math.random()]
        })
    }

    render() {
        console.log('组件ing');
        return (
            <div>
                <h2>{this.props.boss}，牛逼！</h2>
                <Button type='primary' onClick={() => this.addSolder()}>加入直播间</Button>
                <List
                    renderHeader={() => '主播们'}
                >
                    {this.state.solders.map(v => {
                        return (
                            <List.Item key={v}>
                                {v}
                            </List.Item>
                        )
                    })}
                </List>
                {/*<ul>*/}
                    {/*{this.state.solders.map(v => {*/}
                        {/*return <li key={v}>{v}</li>*/}
                    {/*})}*/}
                {/*</ul>*/}
            </div>
        )
    }
}

export default App;