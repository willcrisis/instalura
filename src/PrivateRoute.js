import React, {Component} from "react";
import {Route, Redirect, matchPath} from "react-router-dom";

const PrivateRoute = ({component: Component, ...rest}) => {
    const match = matchPath(rest.location.pathname, {
        path: '/timeline',
        exact: true,
        strict: false
    });
    return (
        <Route {...rest} render={props => (
            match && !localStorage.getItem('token') ? (
                    <Redirect to={{
                        pathname: '/',
                        state: {from: props.location}
                    }}/>
                ) : (
                    <Component {...props}/>
                )
        )}/>
    )
};

export default PrivateRoute;