import React from 'react';
import { BlueColor, GrayColor, TextFont } from '../../Constants';

const footer = () => {
  const style = {
    backgroundColor: BlueColor,
    color: GrayColor,

    padding: '5em 0em',

    width: '100%',
    textAlign: 'center',
    fontFamily: TextFont,
    fontSize: '15px',
  };

  const inner = {
    margin: 'auto',
    width: '90%',
  };

  return (
    <div style={style}>
      <div style={inner}>
        Created with love by Riccardo Musso. <br />
        If you like it, you'll probably appreciate my work on GitHub (@rimuz).
        <p />
        For any problem please contact therthem7@gmail.com
      </div>
    </div>
  );
};

export default footer;
