import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import Login from './components/Login';
import PrivateRoute from './PrivateRoute';
import registerServiceWorker from './registerServiceWorker';
import './css/reset.css'
import './css/timeline.css'
import './css/login.css'
import {BrowserRouter as Router, Route, Switch, Redirect} from "react-router-dom";

ReactDOM.render(
    <Router>
        <Switch>
            <Route path="/" exact component={Login}/>
            <Route path="/timeline" component={App} />
            <Redirect path="*" to="/" />
        </Switch>
    </Router>
    , document.getElementById('root'));
registerServiceWorker();
