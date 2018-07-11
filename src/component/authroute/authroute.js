import React from 'react';
import axios from 'axios';
import {withRouter} from 'react-router-dom';
import {loadData} from '../../redux/user';
import {connect} from 'react-redux';

// import asyncRequest from '../../Fetch';

@withRouter
@connect(
    state => state.user,
    {loadData}
)

class AuthRoute extends React.Component {
    componentDidMount() {
        const publicList = ['/login', '/register'];
        const pathname = this.props.location.pathname;
        if (publicList.indexOf(pathname) > -1) {
            return null;
        }
        const user_id = localStorage.getItem('user_id');
        if (!user_id) this.props.history.push('/login');
        axios.get('user/info', {params: {user_id: user_id}}).then(res => {
            if (res.status === 200) {
                if (res.data.code === 0) {
                    this.props.loadData(res.data.data);
                } else {
                    this.props.history.push('/login')
                }
            } else {
                this.props.history.push('/login')
            }
        });

        // asyncRequest({
        //     url:'send_code',
        // })
    }

    render() {
        return null
    }
}

export default AuthRoute;