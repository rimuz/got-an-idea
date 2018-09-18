import React from 'react';
import Comp from '../../../hoc/Comp/Comp';

const backgroundSetter = (color) => {
  return () => {
    const list = [ 'blue-bg', 'gray-bg', 'white-bg' ];
    for(const s of list){
      document.body.classList.remove(s);
    }


    if(color === 'gray')
      document.body.classList.add("gray-bg");
    else if(color === 'blue')
      document.body.classList.add("blue-bg");
    else if(color === 'white')
      document.body.classList.add("white-bg");
    else {
      // Not supported yet
    }

    return <div />;
  };
};

export default backgroundSetter;
