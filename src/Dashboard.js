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
        const match = this.props.match;
        const app = (
            <div>
                {this.props.isAuth ? <button onClick={this.props.logout}>logout{this.props.user}</button> : null}
                <ul>
                    <li><Link to={`${match.url}/`}>卢本伟直播间</Link></li>
                    <li><Link to={`${match.url}/mafei`}>马飞</Link></li>
                    <li><Link to={`${match.url}/lubenwei`}>卢本伟</Link></li>
                </ul>
                <Route path={`${match.url}/`} exact component={App}></Route>
                <Route path={`${match.url}/mafei`} component={Mafei}></Route>
                <Route path={`${match.url}/lubenwei`} component={Lubenwei}></Route>
            </div>
        );
        const redirectToLogin = <Redirect to='/login' />;
        return this.props.isAuth ? app : redirectToLogin;
    }
}

export default Dashboard;