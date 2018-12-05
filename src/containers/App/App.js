import React, { Component } from 'react';

import Header from '../../components/Header/Header';
import StartPage from '../../containers/StartPage/StartPage';
import Browse from '../../containers/Browse/Browse';
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
            <Route path='/browse' component={Browse} />
            <Route path='/search' component={Browse} />
            <Route path='/list' component={Browse} />
            <Route path='/post' component={Browse} />
            <Route path='/user' component={Browse} />

            {/* 404 Page */}
            <Route path='/' component={PageNotFound} />
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
