import React, { Component } from 'react';
import MetaTags from 'react-meta-tags';

import Header from '../../components/Header/Header';
import StartPage from '../../containers/StartPage/StartPage';
import TellMore from '../../containers/TellMore/TellMore';
import RendirectToHome from './RedirectToHome/RedirectToHome';
import BackgroundSetter from './BackgroundSetter/BackgroundSetter';

import { BrowserRouter, Route, Switch } from 'react-router-dom';
import './App.css';

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div>
          <Header />
          {/*<Switch>
            <Route path='/' exact render={BackgroundSetter('blue')} />
            <Route path='/' render={BackgroundSetter('white')} />
          </Switch>*/}

          <Route path='/' exact component={StartPage} />
          <Route path='/tell-more' exact component={TellMore} />
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
