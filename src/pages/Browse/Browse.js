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