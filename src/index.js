import React from 'react';
import ReactDOM from 'react-dom';
import App from './pages/App/App';
import registerServiceWorker from './registerServiceWorker';

import smoothscroll from 'smoothscroll-polyfill';

smoothscroll.polyfill();
ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
