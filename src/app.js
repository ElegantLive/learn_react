import React from 'react';
import {Route,Switch} from 'react-router-dom';
import AuthRoute from './component/authroute/authroute';
import BossInfo from "./container/bossinfo";
import Login from "./container/login";
import Register from "./container/register";
import Dashboard from "./component/dashboard/dashboard";
import GeniusInfo from "./container/geniusinfo";
import Chat from "./component/chat/chat";

class App extends React.Component{
    render() {
        return (
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
        )
    }
}

export default App;