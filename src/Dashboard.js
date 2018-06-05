import React from 'react';
import {Link, Route,Redirect} from 'react-router-dom'
import App from './App';
import {connect} from 'react-redux';
import {logout} from './Auth.redux';

function Lubenwei() {
    return <h1>nice！马飞</h1>
}

function Mafei() {
    return <h1>难受啊，开</h1>
}

@connect(
    state=>state.auth,
    {logout}
)
class Dashboard extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        console.log(this.props);
        const app = (
            <div>
                {this.props.isAuth ? <button onClick={this.props.logout}>logout</button> : redirectToLogin}
                <ul>
                    <li><Link to='/dashboard/'>卢本伟直播间</Link></li>
                    <li><Link to='/dashboard/mafei'>马飞</Link></li>
                    <li><Link to='/dashboard/lubenwei'>卢本伟</Link></li>
                </ul>
                <Route path='/dashboard/' exact component={App}></Route>
                <Route path='/dashboard/mafei' component={Mafei}></Route>
                <Route path='/dashboard/lubenwei' component={Lubenwei}></Route>
            </div>
        );
        const redirectToLogin = <Redirect to='/login' />;
        return this.props.isAuth ? app : redirectToLogin;
    }
}

export default Dashboard;