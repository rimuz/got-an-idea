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

    top: '0',
    left: '0',
    width: '100%',
    height: '100%',
  };

  const a = {
    display: 'inline-block',

    '@media (max-width: 50em)': {
      'display': 'none',
    }
  };

  const b = {
    'display': 'none',

    '@media (max-width: 50em)': {
      'display': 'inline-block',
    }
  }

  const inner = {
    height: '2vw',
    width: '30vw'
  };

  return (
    <Comp>
      <Center horizontal vertical>
        <div style={a}>
            <div style={inner}>
              <TextField />
            </div>
        </div>

        <div style={{b, ...style}}>
          <HiddenBar />
        </div>
      </Center>
    </Comp>
  );
};

export default Radium(searchBar);
