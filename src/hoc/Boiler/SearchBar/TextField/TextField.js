import React from 'react';
import { TextFont, BlueColorB2, BlueColorB3, GrayColor } from '../../../../Constants';
import Center from '../../../Center/Center';

const textField = () => {
  const input = {
    height: '100%',
    width: '100%',

    outline: 'none',
    border: 'none',
    autocapitalize: 'false',
    visibility: 'visible',

    borderRadius: '0.5vw',
    fontSize: '1vw',
    padding: '0.2vw 0.75vw 0.2vw 0.75vw',
    fontFamily: TextFont,

    backgroundColor: BlueColorB2,
    boxShadow: '0.2vw 0.2vw 0px 0px ' + BlueColorB3,
    color: GrayColor,
  };

  return (
    <input type='text' style={input} placeholder='Search'></input>
  );
};

export default textField;
