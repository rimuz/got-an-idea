import axios from 'axios';
import { openModal } from './modals.js';

export const triedLoggingIn = () => ({
  type: 'TRIED_LOGGING_IN',
});

export const login = (jwt, userData) => dispatch => {
  axios.defaults.data = { jwt };
  console.log({jwt});

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
      failed(error);
    });
};

export const setUserData = userData => ({
  type: 'SET_USER_DATA',
  userData,
});