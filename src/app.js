import React from 'react';
import {Route, Switch} from 'react-router-dom';
import AuthRoute from './component/authroute/authroute';
import BossInfo from "./container/bossinfo";
import Login from "./container/login";
import Register from "./container/register";
import Dashboard from "./component/dashboard/dashboard";
import GeniusInfo from "./container/geniusinfo";
import Chat from "./component/chat/chat";

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            _hasError: false
        }
    }

    componentDidCatch(err, info) {
        console.log(err, info);
        this.setState({
            _hasError: true
        })
    }

    render() {
        return (this.state._hasError) ? (<h2>页面出错了,请稍后再试</h2>) : (
            <div>
                <AuthRoute/>
                <Switch>
                    <Route path='/bossinfo' component={BossInfo}/>
                    <Route path='/geniusinfo' component={GeniusInfo}/>
                    <Route path='/login' component={Login}/>
                    <Route path='/register' component={Register}/>
                    <Route path='/chat/:user' component={Chat}/>
                    <Route component={Dashboard}/>
                </Switch>
            </div>
        );
    }
}

export default App;