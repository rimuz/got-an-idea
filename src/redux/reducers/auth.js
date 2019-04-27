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

const initialState = {
  triedLoggingIn: false, // e.g. for making 'getPosts' request after auto-login on start up
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
    case 'TRIED_LOGGING_IN':
      return {
        ...state,
        triedLoggingIn: true,
      }

    case 'LOG_IN':
      return {
        ...state,

        userData: (action.userData ?
          action.userData : state.userData),
        token: action.token,
        isLoggedIn: true,
      };
      
    case 'LOG_OUT':
      return {
        ...initialState,
        triedLoggingIn: true,
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