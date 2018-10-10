import React from 'react';
import Radium from 'radium';

import { TitleFont, GrayColor } from '../../../Constants'

const subtitle = () => {
  const style = {
    fontFamily: TitleFont,
    fontSize: '2vw',
    marginTop: '-2vw',
    color: GrayColor,

    '@media (max-width: 50em)': {
      fontSize: '3.5vw'
    }
  };

  return (
    <div style={style}>
        The platform for sharing your billion dollars idea
    </div>
  );
};

export default Radium(subtitle);
