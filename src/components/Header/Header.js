import React from 'react';
import MetaTags from 'react-meta-tags';
import { BlueColor } from '../../Constants';

const header = () => {
  return (
    <MetaTags>
      <title>Got an idea?</title>

      {/* Fonts */}
      <link href="https://fonts.googleapis.com/css?family=Oxygen:700" rel="stylesheet" />
      <link href="https://fonts.googleapis.com/css?family=Gloria+Hallelujah" rel="stylesheet" />
      <link href="https://fonts.googleapis.com/css?family=Permanent+Marker" rel="stylesheet" />
      <link href="https://fonts.googleapis.com/css?family=M+PLUS+Rounded+1c:400,700" rel="stylesheet" />

      { /* Meta tags */}
      <meta name="theme-color" content={BlueColor} />
    </MetaTags>
  );
};

export default header;
