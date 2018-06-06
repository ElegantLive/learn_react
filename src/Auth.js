import React from 'react';
import {connect} from 'react-redux';
import {Redirect} from 'react-router-dom'
import {login} from './Auth.redux';
// import axios from 'axios';
import AsyncRequest from './Fetch';

@connect(
    state => state.auth,
    {login}
)
class Auth extends React.Component {
    constructor(props) {
        super(props)
    }

    componentDidMount() {
        // axios.get('/').then(res=>{
        //     console.log(res);
        // })

        AsyncRequest({
            url: 'auth/admin',
            data: {
                id: 5,
                name : '123'
            }
        });

        fetch('http://api.mi.com/v1/auth/admin', {});
    }

    render() {
        return (
            <div>
                {this.props.isAuth ? <Redirect to='/dashboard'/> : null}
                <h2>请登陆</h2>
                <button onClick={this.props.login}>login</button>
            </div>
        )
    }
}

export default Auth;