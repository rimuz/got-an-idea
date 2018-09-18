import React from 'react';
import { GrayColor, BlueColor, TitleFont } from '../../../Constants'
import { StyleRoot } from 'radium'

const button = (props) => {
  const style = {
    padding: '0.7vw',

    borderStyle: 'solid',
    borderColor: GrayColor,
    borderRadius: '1vw',

    fontSize: '1.5vw',
    fontFamily: TitleFont,
    fontWeight: 'lighter',

    color: BlueColor,
    backgroundColor: GrayColor,

    marginTop: '2vw',
    marginRight: '1vw',
    cursor: 'pointer',

    '@media (max-width: 50em)': {
      fontSize: '2.5vw'
    },

    ':hover': {
      backgroundColor: BlueColor,
      color: GrayColor,
    }
  };

  return (
    <StyleRoot style={{ display: 'inline' }}>
      <button style={style} onClick={props.clicked}>
        {props.children}
      </button>
    </StyleRoot>
  );
};

export default button;
