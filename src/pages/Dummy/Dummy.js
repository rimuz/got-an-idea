import React from 'react';
import Boiler from '../../components/Boiler/Boiler';
import styles from './Dummy.module.scss';

const dummy = () => {
  return (
    <Boiler>
      <div className={styles.page}>
        <div className={styles.container} >
          <div className={styles.emoji}>
            <span role='img' aria-label='warning'>⚠️</span>
          </div>
          
          <div>
            <h2>Working in progress</h2>
            <p>This page is under construction.</p>
          </div>
        </div>
      </div>
    </Boiler>
  );
};

export default dummy;