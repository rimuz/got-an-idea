import React from 'react';
import NavBar from './NavBar/NavBar';
import Footer from '../../components/Footer/Footer';
import styles from './Boiler.module.scss';

const boiler = (props) => {
  return (
    <div className={styles.outer}>
      <NavBar />
      <div className={styles.children}>
        {props.children}
      </div>
      <Footer />
    </div>
  );
};

export default boiler;
