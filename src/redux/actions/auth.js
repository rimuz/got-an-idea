import axios from 'axios';

export const login = (token, userData) => dispatch => {
  const tok = 'Bearer ' + token;
  axios.defaults.headers.common['Authorization'] = tok;

  dispatch({
    type: 'LOG_IN',
    token, userData
  });
};

export const logout = () => dispatch => {
  axios.defaults.headers.common['Authorization'] = undefined;
  dispatch({ type: 'LOG_OUT' });
};

export const checkAndFetch = (token, failed) => dispatch => {
  axios.post('/user/check', { token })
    .then(response => {
      console.log('Logged in!!!!');
      dispatch(login(token, response.data.userData));
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