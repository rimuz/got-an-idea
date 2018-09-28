import React from 'react';

import { BlueColorB2, BlueColorB3, GrayColor, Search, TextFont } from '../../../Constants';

import Radium from 'radium';
import Center from '../../Center/Center';
import searchImage from './search.png';
import './SearchBar.css';

const searchBar = () => {
  const style = {
    position: 'absolute',
    visibility: 'hidden',
    top: '0',
    left: '0',
    width: '100%',
    height: '100%',
  };

  const input = {
    height: '2vw',
    width: '30vw',

    outline: 'none',
    border: 'none',
    autocapitalize: 'false',
    visibility: 'visible',

    borderRadius: '0.5vw',
    fontSize: '1vw',
    padding: '0.2vw 0.75vw 0.2vw 0.75vw',
    fontFamily: TextFont,

    backgroundColor: BlueColorB2,
    boxShadow: '2px 2px 0px 0px ' + BlueColorB3,
    color: GrayColor,
  };

  return (
    <div style={style} class='SearchBar'>
        <Center vertical horizontal>
          <input type='text' style={input} placeholder='Search'></input>
        </Center>
    </div>
  );
};

export default Radium(searchBar);
