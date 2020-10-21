import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import landing from './pages/landing';
import ongsMap from './pages/ongsMap';
import Ong from './pages/Ong';
import CreateOng from './pages/CreateOng';

function Routes() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={landing} />
        <Route path="/app" component={ongsMap} />
        <Route path="/ong/create" component={CreateOng} />
        <Route path="/ong/:id" component={Ong} />
      </Switch>
    </BrowserRouter>
  )
}

export default Routes;