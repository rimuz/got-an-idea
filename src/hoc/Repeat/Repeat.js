import React from 'react';

const repeat = (props) => {
  if(!props.n)
    props.n = 0;

  var list = [];
  for (var i = 0; i < props.n; ++i)
    list.push(props.children);
  return list;
};

export default repeat;
