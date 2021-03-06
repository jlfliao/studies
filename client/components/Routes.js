import React from 'react';
import AllItems from './AllItems';
import Table from './Table';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

const Routes = () => {
  return (
    <Router>
      <div
        style={{
          backgroundColor: '#F5F5F5',
          height: '100vh',
          borderRadius: '25px',
        }}
      >
        <h1 style={{ padding: '2rem', fontFamily: 'Arial' }}>Studies</h1>
        <Switch>
          <Route exact path='/' component={AllItems} />
          <Route path='/studies/:ids' children={<Table />} />
        </Switch>
      </div>
    </Router>
  );
};

export default Routes;
