import React from 'react';

const card = (props) => {
  const style = {
    boxShadow: '2px 2px 10px 0px lightgray',
    borderRadius: '5px',
    margin: '20px',
    backgroundColor: 'white',
    padding: '10px',
  };

  if(props.inline !== undefined){
    style.display = 'inline-block'
  }

  return (
    <div style={{...style, ...props.style}}>
      {props.children}
    </div>
  );
};

export default card;
