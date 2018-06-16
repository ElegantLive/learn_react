import React from 'react';
import ReactDom from 'react-dom';
import {createStore, applyMiddleware, compose} from 'redux';
import thunk from 'redux-thunk';
import {Provider} from 'react-redux';
import {BrowserRouter, Route, Redirect,Switch} from 'react-router-dom';

import Login from './container/login';
import Register from './container/register';
import reducers from './reducer';
import './config'

const reduxDectools = window.devToolsExtension;

const store = createStore(reducers, compose(
    applyMiddleware(thunk),
    reduxDectools ? reduxDectools() : f => f
));

ReactDom.render(
    (<Provider store={store}>
        <BrowserRouter>
            <div>
                <Route path='/login' component={Login}/>
                <Route path='/register' component={Register}/>
            </div>
        </BrowserRouter>
    </Provider>),
    document.getElementById('root')
);
