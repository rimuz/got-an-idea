import React from 'react';
import ReactDOM from 'react-dom';
import smoothscroll from 'smoothscroll-polyfill';
import registerServiceWorker from './registerServiceWorker';

import App from './pages/App/App';
import './index.scss';

export const prefix = "https://got-an-idea.com";

smoothscroll.polyfill();
ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
