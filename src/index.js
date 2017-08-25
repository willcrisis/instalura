import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import Login from "./components/Login";
import Logout from "./components/Logout";
import PrivateRoute from "./PrivateRoute";
import registerServiceWorker from "./registerServiceWorker";
import "./css/reset.css";
import "./css/timeline.css";
import "./css/login.css";
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import {createStore, applyMiddleware, combineReducers} from "redux";
import thunkMiddleware from "redux-thunk";
import {timeline} from "./reducers/timeline";
import {header} from "./reducers/header";
import {Provider} from "react-redux";

const reducers = combineReducers({timeline, header});
const store = createStore(reducers, applyMiddleware(thunkMiddleware));

ReactDOM.render(
    <Provider store={store}>
        <Router>
            <Switch>
                <Route path="/" exact component={Login}/>
                <PrivateRoute path="/timeline/:login?" component={App}/>
                <PrivateRoute path="/logout" component={Logout}/>
            </Switch>
        </Router>
    </Provider>
    , document.getElementById('root'));
registerServiceWorker();
