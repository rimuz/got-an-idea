import React from 'react';
import MetaTags from 'react-meta-tags';

const header = () => {
  return (
    <MetaTags>
      {/* Fonts */}
      <link href="https://fonts.googleapis.com/css?family=Permanent+Marker" rel="stylesheet" />
      <link href="https://fonts.googleapis.com/css?family=M+PLUS+Rounded+1c:400,700" rel="stylesheet" />

      { /* Meta tags */}
      <meta name="theme-color" content='#000080' />

      { /* Title */ }
      <title>Got an idea?</title>
    </MetaTags>
  );
};

export default header;
