import { combineReducers } from 'redux';

import modals from './modals';
import newPage from './newPage';
import viewPostPage from './viewPostPage';
import auth from './auth';

export default combineReducers({
  modals, newPage, auth, viewPostPage,
});