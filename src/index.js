import React from 'react';
import ReactDom from 'react-dom';
import {createStore, applyMiddleware, compose} from 'redux';
import thunk from 'redux-thunk';
import {Provider} from 'react-redux';
import {BrowserRouter, Route, Switch} from 'react-router-dom';

import Login from './container/login';
import Dashboard from './component/dashboard/dashboard';
import Register from './container/register';
import BossInfo from './container/bossinfo';
import GeniusInfo from './container/geniusinfo';
import AuthRoute from './component/authroute/authroute';
import Chat from './component/chat/chat';
import reducers from './reducer';
import './config';
import './index.css';

const reduxDectools = window.devToolsExtension;

const store = createStore(reducers, compose(
    applyMiddleware(thunk),
    reduxDectools ? reduxDectools() : f => f
));

ReactDom.render(
    (<Provider store={store}>
            <BrowserRouter>
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
            </BrowserRouter>
        </Provider>
    ),
    document.getElementById('root')
);
