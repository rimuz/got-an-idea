import React from 'react';
import { render } from 'react-snapshot';
import axios from 'axios';
import smoothscroll from 'smoothscroll-polyfill';

import registerServiceWorker from './registerServiceWorker';
import Root from './components/Root/Root';

export const prefix = "https://got-an-idea.com";
axios.defaults.baseURL = "https://api.got-an-idea.com";

smoothscroll.polyfill();
render(<Root />, document.getElementById('root'));
registerServiceWorker();
