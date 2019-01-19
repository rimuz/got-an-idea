const initialState = {
  isLoggedIn: false,

  userData: {
    name: 'Username',
    email: 'example@got-an-idea.com',
    desc: 'Here it is the description.',
    color: { hue: '100', light: '23', sat: '50' },
    pic: undefined,
    posts: 344,
  },
};

const auth = (state = initialState, action) => {
  switch(action.type){
    case 'LOG_IN':
      return {
        ...initialState,
        isLoggedIn: true,
      };
    
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