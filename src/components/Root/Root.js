/*
 *  Copyright 2019 Riccardo Musso
 *
 *  Licensed under the Apache License, Version 2.0 (the "License");
 *  you may not use this file except in compliance with the License.
 *  You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 *  Unless required by applicable law or agreed to in writing, software
 *  distributed under the License is distributed on an "AS IS" BASIS,
 *  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *  See the License for the specific language governing permissions and
 *  limitations under the License.
 *
*/

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
