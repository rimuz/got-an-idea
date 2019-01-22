import React from 'react';
import { render } from 'react-snapshot';
import axios from 'axios';
import smoothscroll from 'smoothscroll-polyfill';

import registerServiceWorker from './registerServiceWorker';
import App from './pages/App/App';
import './index.scss';

export const prefix = "https://got-an-idea.com";
export const axiosInstance = axios.create({
  baseURL: 'https://cut6d4fzn2.execute-api.us-east-1.amazonaws.com/dev/',
});

smoothscroll.polyfill();
render(<App />, document.getElementById('root'));
registerServiceWorker();
