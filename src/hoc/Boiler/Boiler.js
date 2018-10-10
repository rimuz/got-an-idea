import React, { Component } from 'react';
import Radium from 'radium';
import { withRouter } from 'react-router-dom';

import { GrayColor, BlueColor, TitleFont } from '../../Constants'
import Comp from '../Comp/Comp';
import Button from './Button/Button';
import SearchBar from './SearchBar/SearchBar';

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

      '@media (max-width: 50em)': {
        height: '12vw',
      },
    };

    const title = {
      display: 'inline-block',

      marginLeft: '1vw',
      cursor: 'pointer',

      fontSize: '3vw',
      fontFamily: TitleFont,

      '@media (max-width: 50em)': {
        fontSize: '7vw',
      }
    };

    const buttons = {
      display: 'inline-block',
      marginTop: '0.75vw',
      float: 'right',

      '@media (max-width: 50em)': {
        marginTop: '2vw',
      }
    };

    const content = {
      paddingTop: '5vw',

      '@media (max-width: 50em)': {
        paddingTop: '12vw',
      },
    };

    return (
      <Comp>
        <div style={navBar}>
          <div style={title} onClick={this.titleClickHandler}>
            Got an idea?
          </div>

          <div style={buttons}>
            <Button>Login</Button>
            <Button>Register</Button>
          </div>

          <SearchBar />
        </div>

        <div style={content}>
          {this.props.children}
        </div>
      </Comp>
    );
  }
};

export default withRouter(Radium(Boiler));
