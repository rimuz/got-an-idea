import React, { Component } from 'react';

import Header from '../../components/Header/Header';
import StartPage from '../../containers/StartPage/StartPage';
import BrowsePage from '../../containers/BrowsePage/BrowsePage';
import PageNotFound from '../../containers/404/PageNotFound';

import { BrowserRouter, Route, Switch } from 'react-router-dom';
import './App.scss';

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div>
          <Header />

          <Switch>
            <Route path='/' exact component={StartPage} />
            <Route path='/browse' exact component={BrowsePage} />
            <Route path='/search' exact component={BrowsePage} />
            <Route path='/list' exact component={BrowsePage} />
            <Route path='/post' exact component={BrowsePage} />
            <Route path='/user' exact component={BrowsePage} />

            {/* 404 Page */}
            <Route path='/' component={PageNotFound} />
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
