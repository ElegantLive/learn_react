import React from 'react';
import Logo from '../component/logo/logo';
import {List,InputItem,WhiteSpace,WingBlank,Button} from 'antd-mobile'
import {userLogin} from '../redux/user';
import {Redirect} from 'react-router-dom'
import {connect} from 'react-redux';
import '../index.css';
import Form from '../component/form/form';

@connect(
    state => state.user,
    {userLogin}
)
@Form
class Login extends React.Component{
    constructor(props){
        super(props);
        this.handleLogin = this.handleLogin.bind(this);
        this.register = this.register.bind(this);
    }

    componentDidMount()
    {
        this.props._handleChange('redirectTo',null)
    }

    handleLogin(){
        this.props.userLogin(this.props.state);
    }

    register(){
        this.props.history.push('/register');
    }
    render(){
        const redirect = this.props.redirectTo;
        const ignorePath = ['/login','/register'];
        const path = ignorePath.find(v => v === redirect);
        return (
            <div>
                {(redirect&&!path) ? <Redirect to={redirect} /> : null}
                <Logo/>
                <WingBlank>
                    <List>
                        {this.props.msg ? <p className='error-msg'>{this.props.msg}</p> : null}
                        <InputItem onChange={v => this.props._handleChange('user', v)}>用户</InputItem>
                        <WhiteSpace/>
                        <InputItem type='password' onChange={v => this.props._handleChange('pwd', v)}>密码</InputItem>
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