import * as React from 'react';
import * as ReactDOM from 'react-dom';
import App from './App';
import './index.scss';

import { CallbackRouteWrapper } from './callback/hoc/withCallbackRoute';

ReactDOM.render(
  <React.Fragment>
    {
    <CallbackRouteWrapper type='browser'>
      <App/>
    </CallbackRouteWrapper>
    }    
  </React.Fragment>,
  document.getElementById('root')
);