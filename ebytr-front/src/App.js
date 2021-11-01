import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { SignIn, SignUp } from './pages';

function App() {
  return (
    <Switch>
      <Route exact path="/" component={ SignIn } />
      <Route exact path="/signup" component={ SignUp } />
    </Switch>
  );
}

export default App;
