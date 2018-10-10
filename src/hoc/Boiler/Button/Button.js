import React from 'react';
import { GrayColor, BlueColor, TitleFont } from '../../../Constants'
import Radium from 'radium';

const button = (props) => {
  const style = {
    padding: '0.5vw',

    borderStyle: 'solid',
    borderColor: GrayColor,
    borderRadius: '1vw',

    fontSize: '1.5vw',
    fontFamily: TitleFont,
    fontWeight: 'lighter',

    color: BlueColor,
    backgroundColor: GrayColor,

    marginRight: '1vw',
    cursor: 'pointer',
    display: 'inline-block',

    '@media (max-width: 50em)': {
      fontSize: '3vw',
      padding: '1.25vw',
      borderRadius: '2vw',
      marginRight: '2vw'
    },

    ':hover': {
      backgroundColor: BlueColor,
      color: GrayColor,
    }
  };

  return (
    <button style={style} onClick={props.clicked}>
      {props.children}
    </button>
  );
};

export default Radium(button);
