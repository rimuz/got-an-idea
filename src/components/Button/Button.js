import React from 'react';
import { GrayColor, BlueColor, TitleFont } from '../../Constants'
import Radium from 'radium'

const button = (props) => {
  var Background = GrayColor, Color = BlueColor;

  if(props.invertedColors){
    Color = GrayColor;
    Background = BlueColor;
  }

  const style = {
    padding: '0.5em',

    borderStyle: 'solid',
    borderColor: Background,
    borderRadius: '0.75em',
    borderWidth: '0.1em',

    fontSize: '1em',
    fontFamily: TitleFont,
    fontWeight: 'lighter',

    color: Color,
    backgroundColor: Background,
    cursor: 'pointer',

    transition: 'color 0.75s, background-color 0.75s',

    ':hover': {
      backgroundColor: Color,
      color: Background,
    },
  };

  return (
    <button style={{...style, ...props.style}} onClick={props.clicked}>
      {props.children}
    </button>
  );
};

export default Radium(button);
