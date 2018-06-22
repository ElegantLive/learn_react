import React from 'react';
import Logo from '../component/logo/logo';
import {List,InputItem,WhiteSpace,WingBlank,Button} from 'antd-mobile'
import {userLogin} from '../redux/user.redux';
import {Redirect} from 'react-router-dom'
import {connect} from 'react-redux';
import '../index.css';

@connect(
    state => state.user,
    {userLogin}
)

class Login extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            'user': '',
            'pwd': ''
        };
        this.handleLogin = this.handleLogin.bind(this);
        this.register = this.register.bind(this);
    }

    _handleChange(key, value) {
        this.setState({
            [key]: value
        })
    }

    handleLogin(){
        this.props.userLogin(this.state);
    }

    register(){
        this.props.history.push('/register');
    }
    render(){
        return (
            <div>
                {this.props.redirectTo ? <Redirect to={this.props.redirectTo} /> : null}
                <Logo/>
                <WingBlank>
                    <List>
                        {this.props.msg ? <p className='error-msg'>{this.props.msg}</p> : null}
                        <InputItem onChange={v => this._handleChange('user', v)}>用户</InputItem>
                        <WhiteSpace/>
                        <InputItem type='password' onChange={v => this._handleChange('pwd', v)}>密码</InputItem>
                    </List>
                    <Button onClick={this.handleLogin} type='primary'>登陆</Button>
                    <WhiteSpace/>
                    <Button onClick={this.register} type='primary'>注册</Button>
                </WingBlank>

            </div>
        )
    }
}


export default Login;