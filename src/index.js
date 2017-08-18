import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import Login from "./components/Login";
import PrivateRoute from "./PrivateRoute";
import registerServiceWorker from "./registerServiceWorker";
import "./css/reset.css";
import "./css/timeline.css";
import "./css/login.css";
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";

ReactDOM.render(
    <Router>
        <Switch>
            <Route path="/" exact component={Login}/>
            <PrivateRoute path="/timeline" component={App} />
        </Switch>
    </Router>
    , document.getElementById('root'));
registerServiceWorker();
