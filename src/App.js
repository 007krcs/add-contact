import React, { Fragment } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Dashboard from "./components/Dashboard";
import "./App.css";

class App extends React.Component {
  render() {
    return (
      <Fragment>
        <Router>
          <Route exact path='/' component={Dashboard}></Route>
          <Switch>
            <Route exact path='/Dashboard' component={Dashboard}></Route>
          </Switch>
        </Router>
      </Fragment>
    );
  }
}

export default App;
