import React from 'react';
import { Route, Switch } from 'react-router-dom'

import Home from './components/pages/Home'
import Login from './components/pages/Login'

function App() {
    return (
        <div className="App">
            <Switch>
                <Route exact path={`/`} component={Home} />
                <Route exact path={`/login`} component={Login} />
            </Switch>
        </div>
    );
}

export default App;
