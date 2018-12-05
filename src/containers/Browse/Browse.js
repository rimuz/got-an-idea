import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom'; 

import Boiler from '../../hoc/Boiler/Boiler';
import BrowsePage from './BrowsePage/BrowsePage';
import PostPage from './PostPage/PostPage';

const browse = () => (
  <Boiler>
    <Switch>
      <Route path='/browse' exact component={BrowsePage} />
      <Route path='/browse/post/:id' exact component={PostPage} />
      
      <Route path='/browse' render={
        () => <Redirect to='/404' />
      } />
    </Switch>
  </Boiler>
);
  
export default browse;