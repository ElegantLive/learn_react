import React from 'react';
import {connect} from 'react-redux';
import {Redirect} from 'react-router-dom'
import {login} from './Auth.redux';
import axios from 'axios';
// import asyncRequest from './Fetch';

@connect(
    state =>state.auth,
    {login}
)
class Auth extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: {}
        }
    }

    componentDidMount() {
        // asyncRequest({
        //     url: 'admin',
        //     type:'GET',
        // });

        axios.get('/data')
            .then(res => {
                if (res.status === 200) {
                    this.setState({data: res.data})
                }
            })
    }

    render() {
        return (
            <div>
                <h1>my name is {this.state.data.user}</h1>
                {this.props.isAuth ? <Redirect to='/dashboard'/> : null}
                <h2>请登陆</h2>
                <button onClick={this.props.login}>login</button>
            </div>
        )
    }
}

export default Auth;