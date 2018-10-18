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
    fontSize: '0.6em',
  };

  return (
    <div style={style}>
      Created with love by Riccardo Musso. <br />
      If you like it, you'll probably appreciate my work on GitHub (@rimuz). <br />
      For any problem please contact therthem7@gmail.com
    </div>
  );
};

export default footer;
