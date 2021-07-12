import React from 'react';
import ConnectedAllItems from './AllItems';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

const Routes = () => {
  return (
    <Router>
      <div>
        <h1>Table XI - Item List</h1>
        <Switch>
          <Route exact path='/' component={ConnectedAllItems} />
        </Switch>
      </div>
    </Router>
  );
};

export default Routes;
