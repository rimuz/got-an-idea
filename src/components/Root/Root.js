import React from 'react';
import { Provider } from 'react-redux';

import { BrowserRouter } from 'react-router-dom';
import { CookiesProvider } from 'react-cookie';
import { createStore, applyMiddleware } from 'redux';
import rootReducer from '../../redux/reducers';
import thunk from 'redux-thunk';

import App from '../../pages/App/App';

const store = createStore(
  rootReducer,
  applyMiddleware(thunk)
);

const root = props => (
  <Provider store={store}>
    <BrowserRouter> 
      <CookiesProvider>
          <App />
      </CookiesProvider>
    </BrowserRouter>
  </Provider>
);

export default root;
