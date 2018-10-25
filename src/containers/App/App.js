import React, { Component } from 'react';
import { StyleRoot } from 'radium';

import Header from '../../components/Header/Header';
import StartPage from '../../containers/StartPage/StartPage';
import FeedPage from '../../containers/FeedPage/FeedPage';

import { BrowserRouter, Route } from 'react-router-dom';
import './App.css';

class App extends Component {
  render() {
    return (
      <StyleRoot>
        <BrowserRouter>
          <div>
            <Header />
            {/*<Switch>
              <Route path='/' exact render={BackgroundSetter('blue')} />
              <Route path='/' render={BackgroundSetter('white')} />
            </Switch>*/}

            <Route path='/' exact component={StartPage} />
            <Route path='/feed' exact component={FeedPage} />
          </div>
        </BrowserRouter>
      </StyleRoot>
    );
  }
}

export default App;
