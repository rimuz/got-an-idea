import React from 'react';
import { Redirect } from 'react-router-dom';

const redirectToHome = () => {
  return (
    <Redirect to='/home' />
  );
};

export default redirectToHome;
