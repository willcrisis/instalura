import React, {Component} from "react";
import {Route, Redirect} from "react-router-dom";

const PrivateRoute = ({component: Component, ...rest}) => {
    console.log(rest);
    return (
        <Route {...rest} render={props => (
            localStorage.getItem('token') ? (
                    <Component {...props}/>
                ) : (
                    <Redirect to={{
                        pathname: '/',
                        state: {from: props.location}
                    }}/>
                )
        )}/>
    )
};

export default PrivateRoute;