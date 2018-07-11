import React from 'react';
import Logo from '../component/logo/logo';
import {List, InputItem, WhiteSpace, WingBlank, Button, Radio} from 'antd-mobile';
import {connect} from 'react-redux';
import {Redirect} from 'react-router-dom';
import {userRegister} from '../redux/user';
import Form from '../component/form/form';

@connect(
    state => state.user,
    {userRegister}
)

@Form
class Register extends React.Component {
    constructor(props) {
        super(props);
        this.login = this.login.bind(this);
        this.handleRegister = this.handleRegister.bind(this);
    }

    componentDidMount() {
        this.props._handleChange('type', 'genius');
    }

    handleRegister() {
        this.props.userRegister(this.props.state);
    }

    login() {
        this.props.history.push('/login');
    }

    render() {
        const RadioItem = Radio.RadioItem;
        const redirect = this.props.redirectTo;
        const ignorePath = ['/login', '/register'];
        const path = ignorePath.find(v => v === redirect);
        return (
            <div>
                {(redirect && !path) ? <Redirect to={redirect}/> : null}
                <Logo/>
                <WingBlank>
                    <List>
                        {this.props.msg ? <p className='error-msg'>{this.props.msg}</p> : null}
                        <InputItem
                            onChange={v => this.props._handleChange('user', v)}
                        >用户</InputItem>
                        <WhiteSpace/>
                        <InputItem
                            onChange={v => this.props._handleChange('pwd', v)}
                            type='password'>密码</InputItem>
                        <WhiteSpace/>
                        <InputItem
                            onChange={v => this.props._handleChange('repeatPwd', v)}
                            type='password'>确认密码</InputItem>
                        <RadioItem
                            checked={this.props.state.type === 'genius'}
                            onChange={() => this.props._handleChange('type', 'genius')}
                        >
                            牛人
                        </RadioItem>
                        <RadioItem
                            checked={this.props.state.type === 'boss'}
                            onChange={() => this.props._handleChange('type', 'boss')}
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