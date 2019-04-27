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
