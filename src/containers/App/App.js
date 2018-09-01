import React, { Component } from 'react';
import MetaTags from 'react-meta-tags';

import Header from '../../components/Header/Header';
import StartPage from '../../containers/StartPage/StartPage'
import './App.css';

class App extends Component {
  render() {
    return (
      <div>
        <Header />
        <StartPage />
      </div>
    );
  }
}

export default App;
