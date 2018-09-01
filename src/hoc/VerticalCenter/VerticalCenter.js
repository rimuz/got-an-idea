import React from 'react';
import './VerticalCenter.css';

const verticalCenter = (props) => {
  var style = {};

  console.log(props);
  if(props.alsoHorizontal){
    style = {
      textAlign: 'center'
    };
  }

  return (
    <div id='VerticalCenter_outer'>
      <div style={style} id='VerticalCenter_inner'>
        {props.children}
      </div>
    </div>
  );
};

export default verticalCenter;
