import React from 'react';
import BigTitle from './BigTitle/BigTitle';
import VerticalCenter from '../../hoc/VerticalCenter/VerticalCenter'

const startPage = () => {
  return (
    <VerticalCenter alsoHorizontal>
      <BigTitle />
    </VerticalCenter>
  );
};

export default startPage;
