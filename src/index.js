import React from 'react';
import ReactDom from 'react-dom';
import {createStore, applyMiddleware, compose} from 'redux';
import thunk from 'redux-thunk';
import {Provider} from 'react-redux';
import {BrowserRouter, Route, Redirect,Switch} from 'react-router-dom';

import reducers from './reducers';
import Auth from './Auth';
import Dashboard from './Dashboard';
import './config'

// class Test extends React.Component{
//     render()
//     {
//         console.log(this.props);
//         return <h2>Test</h2>
//     }
// }
const reduxDectools = window.devToolsExtension;

const store = createStore(reducers, compose(
    applyMiddleware(thunk),
    reduxDectools ? reduxDectools() : f => f
));
// console.log(store.getState());

ReactDom.render(
    (<Provider store={store}>
        <BrowserRouter>
            <Switch>
                <Route path='/login' component={Auth}></Route>
                <Route path='/dashboard' component={Dashboard}></Route>
                <Redirect to='/dashboard' />
                {/*<Route path='/' exact component={App}></Route>*/}
                {/*<Route path='/:location' exact component={Test}></Route>*/}
                {/*<Route path='/lubenwei' component={Lubenwei}></Route>*/}
                {/*<Route path='/mafei' component={Mafei}></Route>*/}
                {/*<Route path='/:location' component={Test}></Route>*/}
            </Switch>
        </BrowserRouter>
    </Provider>), document.getElementById('root'));
