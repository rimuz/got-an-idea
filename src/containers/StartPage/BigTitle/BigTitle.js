import React from 'react';
import Radium from 'radium';
import { TitleFont, GrayColor } from '../../../Constants'

const bigTitle = () => {
  const style = {
    fontFamily: TitleFont,
    fontSize: '9vw',
    color: GrayColor,

    '@media (max-width: 800px)': {
      fontSize: '14.5vw'
    }
  };

  return (
    <div style={style}>
      Got an idea?
    </div>
  );
};

export default Radium(bigTitle);
