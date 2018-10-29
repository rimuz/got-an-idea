import React from 'react';
import styles from './Footer.module.scss';

const footer = () => {
  return (
    <div className={styles.outer}>
      <div className={styles.inner}>
        <p>
          Created with love by Riccardo Musso. <br />
          If you like it, you'll probably appreciate my work on GitHub (@rimuz).
        </p>
        <p>
          For any problem please contact therthem7@gmail.com
        </p>
      </div>
    </div>
  );
};

export default footer;
