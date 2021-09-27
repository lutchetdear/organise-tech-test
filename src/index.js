import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';

import { Provider } from 'react-redux'
import sparkleStore from './store/sparkle-store'

ReactDOM.render(
  <Provider store={sparkleStore}>
    <App />
  </Provider>,
  document.getElementById('root')
);

