const initialState = {
  isLoggedIn: false,

  userData: {
    name: 'Username',
    email: 'example@got-an-idea.com',
    color: { hue: '100', light: '23', sat: '50' },
    posts: 344,
  },
};

const auth = (state = initialState, action) => {
  switch(action.type){
    case 'LOG_IN':
      return {
        userData: (action.userData ?
          action.userData : state.userData),
        token: action.token,
        isLoggedIn: true,
      };
      
    case 'LOG_OUT':
      return initialState;
      
    case 'SET_USER_DATA':
      return {
        ...state,

        userData: {
          ...state.userData,
          ...action.userData
        }
      };

    default:
      return state;
  }
}

export default auth;