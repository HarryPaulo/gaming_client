import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './index.css';
// import { BrowserRouter as Router } from 'react-router-dom';
import { unregister } from './registerServiceWorker';
import { Router } from 'react-router-dom'
import createBrowserHistory from 'history/createBrowserHistory'

unregister();
const history = createBrowserHistory();

ReactDOM.render(
  <Router history={history}>
    <App />
  </Router>, 
  document.getElementById('root')
);