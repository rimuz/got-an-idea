import React, { Component } from 'react';
import Radium from 'radium';
import { withRouter } from 'react-router-dom';

import { GrayColor, BlueColor, TitleFont } from '../../Constants'
import Comp from '../Comp/Comp';
import Button from '../../components/Button/Button';
import SearchBar from './SearchBar/SearchBar';
import Footer from '../../components/Footer/Footer';
import logo from './logo-gray.svg'

class Boiler extends Component {
  titleClickHandler = () => {
    this.props.history.push({
      pathname: '/',
    });
  }

  render() {
    const navBar = {
      height: '5vw',
      width: '100%',

      color: GrayColor,
      backgroundColor: BlueColor,
      boxShadow: '0px 3px 8px 0px lightgray',
      position: 'fixed',
      top: '0',
      left: '0',

      '@media (max-width: 800px)': {
        height: '12vw',
      },
    };

    const logoStyle = {
      width: '2vw',
      margin: '1vw 0vw 0vw 1vw',
    };

    const title = {
      display: 'inline-block',

      margin: '1vw 0vw 0vw 1vw',
      cursor: 'pointer',

      fontSize: '2vw',
      fontFamily: TitleFont,

      '@media (max-width: 800px)': {
        margin: '2.25vw 2vw 0vw 2vw',
        fontSize: '5vw',
      }
    };

    const container = {
      display: 'inline-block',
      marginTop: '0.75vw',
      fontSize: '1.25vw',
      float: 'right',

      '@media (max-width: 800px)': {
        marginTop: '2vw',
        fontSize: '3vw',
      }
    };

    const button = {
      marginRight: '0.5em'
    };

    const content = {
      marginTop: '5vw',

      '@media (max-width: 800px)': {
        marginTop: '12vw',
      },
    };

    return (
      <Comp>
        <div style={navBar}>
          <img src={logo} style={logoStyle} />

          <div style={title} onClick={this.titleClickHandler}>
            Got an idea?
          </div>

          <div style={container}>
            <Button style={button}>Login</Button>
            <Button style={button}>Register</Button>
          </div>

          <SearchBar />
        </div>

        <div style={content}>
          {this.props.children}
        </div>

        <Footer />
      </Comp>
    );
  }
};

export default withRouter(Radium(Boiler));
