import React from 'react';
import ReactDom from 'react-dom';
import {createStore, applyMiddleware, compose} from 'redux';
import thunk from 'redux-thunk';
import {Provider} from 'react-redux';
import {BrowserRouter} from 'react-router-dom';
import ApolloClient from "apollo-boost";
import { ApolloProvider } from "react-apollo";

import App from './app';
import reducers from './reducer';
import './config';
import './index.css';

const reduxDectools = window.devToolsExtension;

const store = createStore(reducers, compose(
    applyMiddleware(thunk),
    reduxDectools ? reduxDectools() : f => f
));

const apolloClient = new ApolloClient({
    uri: 'http://localhost:9091/graphql'
});

ReactDom.hydrate(
    (<ApolloProvider client={apolloClient}>
        <Provider store={store}>
            <BrowserRouter>
                <App/>
            </BrowserRouter>
        </Provider>
    </ApolloProvider>),
    document.getElementById('root')
);
