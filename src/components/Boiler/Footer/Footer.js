import React from 'react';
import styles from './Footer.module.scss';

const footer = () => {
  return (
    <footer>
      <div className={styles.inner}>
        <span role='img' aria-label='made'>🛠️</span> with <span role='img' aria-label='love'>️️️❤️</span> by
        <a href="https://github.com/rimuz"> Riccardo Musso</a>
      </div>
    </footer>
  );
};

export default footer;
