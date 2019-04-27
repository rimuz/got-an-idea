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
import { Switch, Route, Redirect } from 'react-router-dom'; 

import Boiler from '../../components/Boiler/Boiler';
import BrowsePage from './BrowsePage/BrowsePage';
import ViewPostPage from './ViewPostPage/ViewPostPage';

const browse = () => (
  <Boiler>
    <Switch>
      <Route path='/browse(.html)?' exact component={BrowsePage} />
      <Route path='/browse/post/:postId' exact component={ViewPostPage} />
      
      <Route path='/browse' render={
        () => <Redirect to='/404' />
      } />
    </Switch>
  </Boiler>
);
  
export default browse;