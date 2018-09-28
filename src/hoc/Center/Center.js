import React from 'react';

const center = (props) => {
  const vert1 = {
    display: 'table',
    position: 'absolute',
    
    top: '0',
    left: '0',
    width: '100%',
    height: '100%',
  };

  const vert2 = {
    display: 'table-cell',
    verticalAlign: 'middle'
  };

  const horiz1 = {
    width: '100%',
    display: 'flex'
  };

  const horiz2 = {
    margin: 'auto'
  };

  console.log(props);
  if(props.vertical){
    var style = {};

    if(props.horizontal){
      style = {
        textAlign: 'center'
      };
    }

    return (
      <div style={vert1}>
        <div style={{...vert2, ...style}}>
          {props.children}
        </div>
      </div>
    );
  } else {
    return (
      <div style={horiz1}>
        <div style={horiz2}>
          {props.children}
        </div>
      </div>
    );
  }
};

export default center;
