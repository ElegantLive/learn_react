import React from 'react';
import ReactDom from 'react-dom';
import {createStore, applyMiddleware, compose} from 'redux';
import thunk from 'redux-thunk';
import {Provider} from 'react-redux';
import {BrowserRouter, Route, Redirect,Switch} from 'react-router-dom';

import reducers from './reducers';
import './config'

const reduxDectools = window.devToolsExtension;

const store = createStore(reducers, compose(
    applyMiddleware(thunk),
    reduxDectools ? reduxDectools() : f => f
));

ReactDom.render(
    (<Provider store={store}>
        <BrowserRouter>
        </BrowserRouter>
    </Provider>), document.getElementById('root'));
