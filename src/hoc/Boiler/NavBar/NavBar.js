import React, { Component } from 'react';
import Radium from 'radium';
import { withRouter } from 'react-router-dom';

import Center from '../../Center/Center';
import Button from '../../../components/Button/Button';
import { BlueColor, BlueColorB2, BlueColorB3, GrayColor, TitleFont } from '../../../Constants';

import img_logo from './logo-gray.svg';
import img_home from './home.svg';
import img_search from './search.svg';
import img_getInspired from './get_inspired.svg';
import img_contacts from './contacts.svg';

class NavBar extends Component {
  titleClickHandler = () => {
    this.props.history.push({
      pathname: '/'
    });
  };

  render(){
    const outer = {
      backgroundColor: BlueColor,
      boxShadow: '0 2px 8px 0px grey',

      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',

      position: 'fixed',
      top: '0',
      width: '100%',
      minHeight: '3.5em',

      '@media (max-width: 800px)': {
          flexDirection: 'column',
      }
    };

    const logo = {
      width: '1.6em',
      margin: '0em 1em 0em 1em',
    };

    const title = {
      color: GrayColor,
      fontFamily: TitleFont,
      fontSize: '1.5em',

      '@media (max-width: 800px)': {
        fontSize: '1.25em',
      }
    };

    const logoAndTitle = {
      display: 'flex',
      alignItems: 'center',
      cursor: 'pointer',

      '@media (max-width: 800px)': {
        margin: '0.5em',
      }
    };

    const center = {
      display: 'flex',
      alignItems: 'center',

      '@media (min-width: 801px)':{
        left: '50%',
        top: '50%',
        transform: 'translate(-50%, -50%)',
        position: 'absolute',
      }
    };

    const icon = {
      padding: '0.5em 0.8em 0.5em 0.8em',
      margin: '0.1em 0em 0.1em 0em',
      borderRadius: '10%',

      cursor: 'pointer',
      width: '1.5em',

      ':hover': {
        backgroundImage: 'radial-gradient(' + BlueColorB3 + ' 0, ' + BlueColor + ' 70%)',
      }
    };

    const home = {
      ...icon,
      width: '1.3em',

      borderBottom: '0.2em solid ' + GrayColor,
      background: '#0000b4',
      boxShadow: '0em 0em 0.4em 0.1em #000064',

      ':hover': {},
    };

    const search = {
      ...icon,
      width: '1.2em',
    };

    return (
      <div style={outer}>
        <span style={logoAndTitle}
              onClick={this.titleClickHandler.bind(this)}>
          <img src={img_logo} style={logo} alt='Logo'/>
          <span style={title}>Got an idea?</span>
        </span>

        <span style={center}>
          <img key='hm' src={img_getInspired} style={home} alt='Home'/>
          <img key='sh' src={img_search} style={search} alt='Search'/>
          <img key='gi' src={img_getInspired} style={icon} alt='Get Inspired'/>
          <img key='co' src={img_contacts} style={icon} alt='Contacts'/>
        </span>
        <span></span>
      </div>
    );
  }
}

export default withRouter(Radium(NavBar));
