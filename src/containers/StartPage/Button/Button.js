import React from 'react';
import { GrayColor, BlueColor, TitleFont } from '../../../Constants'
import Radium from 'radium'

const button = (props) => {
  const style = {
    padding: '0.7vw',

    borderStyle: 'solid',
    borderColor: GrayColor,
    borderRadius: '1vw',
    borderWidth: '0.2vw',

    fontSize: '1.5vw',
    fontFamily: TitleFont,
    fontWeight: 'lighter',

    color: BlueColor,
    backgroundColor: GrayColor,

    marginTop: '2vw',
    marginRight: '1vw',
    cursor: 'pointer',

    '@media (max-width: 50em)': {
      fontSize: '3vw',
      padding: '1.5vw',
      borderRadius: '2vw',

      marginTop: '3.5vw',
      marginRight: '2vw',
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
