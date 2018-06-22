import React from 'react';
import Logo from '../component/logo/logo';
import {List, InputItem, WhiteSpace, WingBlank, Button, Radio} from 'antd-mobile';
import {connect} from 'react-redux';
import {Redirect} from 'react-router-dom';
import {userRegister} from '../redux/user.redux';

@connect(
    state => state.user,
    {userRegister}
)

class Register extends React.Component {
    constructor(props) {
        super(props);
        this.login = this.login.bind(this);
        this.handleRegister = this.handleRegister.bind(this);
        this.state = {
            user: '',
            pwd: '',
            repeatPwd: '',
            type: 'genius',
        }
    }

    handleRegister() {
        this.props.userRegister(this.state);
    }

    _handleChange(key, value) {
        this.setState({
            [key]: value
        })
    }

    login() {
        this.props.history.push('/login');
    }

    render() {
        const RadioItem = Radio.RadioItem;
        return (
            <div>
                {this.props.redirectTo ? <Redirect to={this.props.redirectTo}/> : null}
                <Logo/>
                <WingBlank>
                    <List>
                        {this.props.msg ? <p className='error-msg'>{this.props.msg}</p> : null}
                        <InputItem
                            onChange={v => this._handleChange('user', v)}
                        >用户</InputItem>
                        <WhiteSpace/>
                        <InputItem
                            onChange={v => this._handleChange('pwd', v)}
                            type='password'>密码</InputItem>
                        <WhiteSpace/>
                        <InputItem
                            onChange={v => this._handleChange('repeatPwd', v)}
                            type='password'>确认密码</InputItem>
                        <RadioItem
                            checked={this.state.type === 'genius'}
                            onChange={() => this._handleChange('type', 'genius')}
                        >
                            牛人
                        </RadioItem>
                        <RadioItem
                            checked={this.state.type === 'boss'}
                            onChange={() => this._handleChange('type', 'boss')}
                        >
                            BOSS
                        </RadioItem>
                    </List>
                    <Button type='primary' onClick={this.handleRegister}>注册</Button>
                    <WhiteSpace/>
                    <Button type='primary' onClick={this.login}>登陆</Button>
                </WingBlank>
            </div>
        )
    }
}


export default Register;