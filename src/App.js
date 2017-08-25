import React, {Component} from "react";
import Header from "./components/Header";
import Timeline from "./components/Timeline";
import {createStore, applyMiddleware} from "redux";
import thunkMiddleware from "redux-thunk";
import {timeline} from "./reducers/timeline";

const timelineStore = createStore(timeline, applyMiddleware(thunkMiddleware));

class App extends Component {
    render() {
        return (
            <div id="root">
                <div className="main">
                    <Header/>
                    <Timeline login={this.props.match.params.login} store={timelineStore}/>
                </div>
            </div>
        );
    }
}

export default App;