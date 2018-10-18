import React from 'react';

import { BlueColorB2, BlueColorB3, GrayColor, TextFont } from '../../../Constants';

import Radium from 'radium';
import TextField from './TextField/TextField';
import HiddenBar from './HiddenBar/HiddenBar';
import Center from '../../Center/Center';
import Comp from '../../Comp/Comp';
import './SearchBar.css';

const searchBar = () => {
  const style = {
    position: 'absolute',
    visibility: 'hidden',
    textAlign: 'center',

    top: '0',
    left: '0',
    width: '100%',
    height: '100%',
  };

  const b = {
    'display': 'none',

    '@media (max-width: 800px)': {
      //'display': 'inline-block',
    }
  }

  const inner = {
    display: 'inline-block',
    height: '2vw',
    width: '30vw',

    position: 'relative',
    top: '50%',
    transform: 'perspective(1px) translateY(-50%)',

    '@media (max-width: 800px)': {
      display: 'none'
    }
  };

  return (
    <div style={style}>
        <div style={inner}>
          <TextField />
        </div>

        {/*
        <div style={{b, ...style}}>
          <HiddenBar />
        </div>*/}
    </div>
  );
};

export default Radium(searchBar);
