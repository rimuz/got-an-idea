import React from 'react';

import Boiler from '../../hoc/Boiler/Boiler';
import Card from '../../hoc/Card/Card';
import styles from './BrowsePage.module.scss';

const browsePage = () => {
  return (
    <Boiler>
      <div className={styles.outer}>
        <div className={styles.content}>
          <Card>
            <h1>Un biplano immersivo e blablabla blablabla</h1>
            Ciao come va? Oggi pensavo ad una nuova ideuccia riguardante un'
            eventuale nuovo modello di immersivo.
          </Card>
        </div>
      </div>
    </Boiler>
  );
};

export default browsePage;
