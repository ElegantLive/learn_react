import React from 'react';
import Logo from '../component/logo/logo';
import {List, InputItem, WhiteSpace, WingBlank, Button, Radio} from 'antd-mobile';

class Register extends React.Component {
    constructor(props) {
        super(props);
        this.login = this.login.bind(this);
        this.state = {
            type: 'genius'
        }
    }

    login() {
        this.props.history.push('/login');
    }

    render() {
        const RadioItem = Radio.RadioItem;
        return (
            <div>
                <Logo/>
                <WingBlank>
                    <List>
                        <InputItem>用户</InputItem>
                        <WhiteSpace/>
                        <InputItem type='password'>密码</InputItem>
                        <WhiteSpace/>
                        <InputItem type='password'>确认密码</InputItem>
                        <RadioItem checked={this.state.type === 'genius'}>
                            牛人
                        </RadioItem>
                        <RadioItem checked={this.state.type === 'Boss'}>
                            BOSS
                        </RadioItem>
                    </List>
                    <Button onClick={this.login} type='primary'>登陆</Button>
                    <WhiteSpace/>
                    <Button type='primary'>注册</Button>
                </WingBlank>
            </div>
        )
    }
}


export default Register;