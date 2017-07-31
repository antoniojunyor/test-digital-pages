/**
 * App entry point
 */

// Polyfill
import 'babel-polyfill';

// Libraries
import React from 'react';
import ReactDOM from 'react-dom';
import { Router, browserHistory } from 'react-router';

import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { createStore, applyMiddleware } from 'redux';

import reducers from './reducers';

// Routes
import Routes from './common/components/Routes';

// Base styling
import './common/base.css';


// ID of the DOM element to mount app on
const DOM_APP_EL_ID = 'app';

// Render the router



const createStoreWithMiddleware = applyMiddleware(thunk)(createStore);
const state = createStoreWithMiddleware(reducers);

ReactDOM.render(
  <Provider store={state}>
    <Router history={browserHistory}>
      {Routes}
    </Router>
  </Provider>
  , document.getElementById(DOM_APP_EL_ID));
