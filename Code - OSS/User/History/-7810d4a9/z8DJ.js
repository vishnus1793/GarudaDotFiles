import React, { Component } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import calendarComponent from "../src/components/calendarComponent";

class App extends Component {
  render() {
    return (
      <Router>
        <div>
          <Switch>
            <Route exact path="/" component={calendarComponent} />
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;
