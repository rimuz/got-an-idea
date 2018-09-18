import React from 'react';
import { TitleFont, GrayColor } from '../../../Constants'
import { StyleRoot } from 'radium'

const subtitle = () => {
  const style = {
    fontFamily: TitleFont,
    fontSize: '2vw',
    marginTop: '-2vw',
    color: GrayColor,

    '@media (max-width: 50em)': {
      fontSize: '3vw'
    }
  };

  return (
    <StyleRoot>
      <div style={style}>
          The platform for sharing your billion dollars idea
      </div>
    </StyleRoot>
  );
};

export default subtitle;
