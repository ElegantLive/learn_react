import React from 'react';
import ReactDom from 'react-dom';
import {createStore,applyMiddleware,compose} from 'redux';
import thunk from 'redux-thunk';
import App from './App';
import { counter,add,unfollow,addAsync} from "./index.redux";

const reduxDectools = window.devToolsExtension;

const store = createStore(counter,compose(
    applyMiddleware(thunk),
    reduxDectools?reduxDectools():f=>f
));
function render() {
    ReactDom.render(<App store={store} add={add} unfollow={unfollow} addAsync={addAsync}/>,document.getElementById('root'));
    console.log(store.getState())
}

render();

store.subscribe(render);