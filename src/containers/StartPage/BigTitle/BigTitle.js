import React from 'react';
import { TitleFont, Color } from '../../../Constants'
import './BigTitle.css';

const bigTitle = () => {
  const style = {
    fontFamily: TitleFont,
    fontSize: '9vw',
    color: Color
  };

  return (
    <div style={style}>
      Got an idea?
    </div>
  );
};

export default bigTitle;
