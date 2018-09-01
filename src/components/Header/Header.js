import React, { Component } from 'react';
import MetaTags from 'react-meta-tags';

const header = () => {
  return (
    <MetaTags>
      <title>Got an idea?</title>

      {/* Fonts */}
      <link href="https://fonts.googleapis.com/css?family=Oxygen:700" rel="stylesheet" />
      <link href="https://fonts.googleapis.com/css?family=Gloria+Hallelujah" rel="stylesheet" />
      <link href="https://fonts.googleapis.com/css?family=Permanent+Marker" rel="stylesheet" />
    </MetaTags>
  );
};

export default header;
