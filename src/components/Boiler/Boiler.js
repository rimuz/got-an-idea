import React from 'react';
import NavBar from './NavBar/NavBar';
import Footer from './Footer/Footer';
import styles from './Boiler.module.scss';

const boiler = (props) => {
  return (
    <div className={styles.outer}>
      <NavBar />

      <div className={styles.content}>
        <div className={styles.children}>
          {props.children}
        </div>

        <div className={styles.bottom}>
          <Footer />
        </div>
      </div>
    </div>
  );
};

export default boiler;
