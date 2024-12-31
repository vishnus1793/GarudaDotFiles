import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import LoginForm from './LoginForm';
import Signup from './Signup';

const App = () => {
    return (
        <Router>
            <Switch>
                <Route exact path="/" component={LoginForm} />
                <Route path="/signup" component={Signup} />
            </Switch>
        </Router>
    );
}

export default App;
