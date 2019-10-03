import React from 'react';
import { BrowserRouter, Switch, Route }   from 'react-router-dom';

import Login from './pages/Login/index';
import Dashboard from './pages/Dashboard/index';
import Vaga from './pages/Vaga/index';

export default function Routes() {
  return(
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={Login} />
        <Route path="/dashboard" component={Dashboard} />
        <Route path="/vagas" component={Vaga} />
      </Switch>
    </BrowserRouter>
  )
}