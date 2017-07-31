import React from 'react';
import { Route, IndexRoute } from 'react-router';

import App from './App';
import Users from '../../pages/users/page';


export default (
  <Route path="/" component={App}>
    <IndexRoute component={Users} />
  </Route>
);