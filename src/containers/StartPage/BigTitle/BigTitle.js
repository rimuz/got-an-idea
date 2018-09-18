import React from 'react';
import Radium, { StyleRoot } from 'radium';
import { TitleFont, GrayColor } from '../../../Constants'

const bigTitle = () => {
  const style = {
    fontFamily: TitleFont,
    fontSize: '9vw',
    color: GrayColor,

    '@media (max-width: 50em)': {
      fontSize: '14vw'
    }
  };

  return (
    <StyleRoot>
      <div style={style}>
        Got an idea?
      </div>
    </StyleRoot>
  );
};

export default bigTitle;
