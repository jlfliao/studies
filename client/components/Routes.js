import React from 'react';
import AllItems from './AllItems';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

const Routes = () => {
  return (
    <Router>
      <div>
        <h1>Studies</h1>
        <Switch>
          <Route exact path='/' component={AllItems} />
        </Switch>
      </div>
    </Router>
  );
};

export default Routes;
