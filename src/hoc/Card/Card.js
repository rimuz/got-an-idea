import React from 'react';
import styles from './Card.module.scss';

const card = (props) => {
  return (
    <div className={styles.card}>
      {props.children}
    </div>
  );
};

export default card;
