import React from 'react';

import './index.css';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';

import * as serviceWorker from './serviceWorker';

import { App } from 'app/App';
import { store } from 'store/store';

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>,
  document.getElementById('root'),
);

serviceWorker.unregister();
