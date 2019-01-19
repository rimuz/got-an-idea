import { openModal } from './redux/actions';

export const loginDispatch = dispatch => ({
  showLogin: (then) => dispatch(openModal('LOGIN', 'Log in', {then} )),
});

export const checkLogin = ({ showLogin, isLoggedIn }, then) => {
  if(!isLoggedIn){
    showLogin(then);
    return;
  }
  then();
};