import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import LoginForm from './LoginForm';
import signup from './signup';

const App = () => {
    return (
        <Router>
            <Switch>
                <Route exact path="/" component={LoginForm} />
                <Route path="/signup" component={signup} />
            </Switch>
        </Router>
    );
}

export default App;
