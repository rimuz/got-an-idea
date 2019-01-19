import React from 'react';
import Center from '../../components/Center/Center';
import Button from '../../components/Button/Button';
import styles from './PageNotFound.module.scss';

const pageNotFound = () => {
  return (
    <Center horizontal vertical inner={styles.content} outer={styles.container}
            minHeight='100vh'>
      <h1>Error 404</h1>
      <p>
        I'm sorry. We can't provide the requested page.
      </p>

      <Button to='/'>
        Back to Home
      </Button>
    </Center>
  );
};

export default pageNotFound;
