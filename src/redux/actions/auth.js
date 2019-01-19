export const login = () => ({
  type: 'LOG_IN',
});

export const setUserData = userData => ({
  type: 'SET_USER_DATA',
  userData,
});