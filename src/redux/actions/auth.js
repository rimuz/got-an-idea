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

import axios from 'axios';

export const triedLoggingIn = () => ({
  type: 'TRIED_LOGGING_IN',
});

export const login = (jwt, userData) => dispatch => {
  axios.defaults.data = { jwt };

  dispatch({
    type: 'LOG_IN',
    jwt, userData
  });
};

export const logout = () => dispatch => {
  axios.defaults.data = undefined;
  dispatch({ type: 'LOG_OUT' });
};

export const checkAndFetch = (jwt, success, failed) => dispatch => {
  axios.post('/user/check', { jwt })
    .then(response => {
      dispatch(login(jwt, response.data.userData));
      success(response);
    })
    .catch(error => {
      console.error('Found invalid JSON Web Token in cookies.');
      console.error("Here's the error: ");
      console.error({error});
      failed(error);
    });
};

export const setUserData = userData => ({
  type: 'SET_USER_DATA',
  userData,
});