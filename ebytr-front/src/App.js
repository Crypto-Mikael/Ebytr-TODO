import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { SignIn, SignUp, Tasks } from './pages';

function App() {
  return (
    <Switch>
      <Route exact path="/" component={ SignIn } />
      <Route exact path="/signup" component={ SignUp } />
      <Route exact path="/tasks" component={ Tasks } />
    </Switch>
  );
}

export default App;
