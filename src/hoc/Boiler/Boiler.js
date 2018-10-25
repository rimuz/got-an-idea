import React, { Component } from 'react';
import Radium from 'radium';
import { withRouter } from 'react-router-dom';

import { GrayColor, BlueColor, TitleFont } from '../../Constants'
import Comp from '../Comp/Comp';
import Button from '../../components/Button/Button';

import NavBar from './NavBar/NavBar';
import Footer from '../../components/Footer/Footer';

class Boiler extends Component {
  titleClickHandler = () => {
    this.props.history.push({
      pathname: '/',
    });
  }

  render() {
    const children = {
      marginTop: '4em',
    };

    return (
      <div style={{ fontSize: '16px' }}>
        <NavBar />
        <div style={children}>
          {this.props.children}
        </div>
        <Footer />
      </div>
    );
  }
};

export default withRouter(Radium(Boiler));
