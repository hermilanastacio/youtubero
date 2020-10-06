import * as React from 'react';
import * as ReactDOM from 'react-dom';
import './index.scss';
import { HashRouter, Route } from "react-router-dom";
import Callback from './pages/Callback/Callback';
import App from './App';

ReactDOM.render(
  <HashRouter basename={process.env.REACT_PUBLIC_URL}>
    <Route exact path="/">
      <Callback/>
    </Route>
    <Route exact path="/dashboard">
      <App/>
    </Route>
  </HashRouter>,
  document.getElementById('root')
);