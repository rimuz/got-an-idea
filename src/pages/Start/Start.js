import React, { Component } from 'react';
import { withRouter } from 'react-router';

import Button from '../../components/Button/Button';
import Comp from '../../components/Comp/Comp';
import TellMore from './TellMore/TellMore';
import Footer from '../../components/Boiler/Footer/Footer';
import styles from './Start.module.scss';
import { ReactComponent as LogoGray } from './assets/logo-gray.svg';

class Start extends Component {
  constructor(props){
    super(props);
    this.tellMoreRef = React.createRef();
  }

  tellMeMoreHandler = () => {
    this.tellMoreRef.current.scrollIntoView({ block: 'start',  behavior: 'smooth' });
  };

  render() {
    return (
      <Comp>
        <div className={styles.upper}>
          <div className={styles.title}>
            <LogoGray className={styles.logoFilament} />
            <div className={styles.titleInner}> Got an idea? </div>
          </div>

          <div className={styles.subtitle}>
            The platform for sharing your billion dollar idea
          </div>

          <div className={styles.buttons}>
            <Button clicked={this.tellMeMoreHandler}
                    className={styles.button}>
               Learn more
            </Button>

            <Button className={styles.button} to="/browse">
              Enter
            </Button>
          </div>
        </div>

        <div className={styles.bottom} ref={this.tellMoreRef}>
          <TellMore />
          <Footer />
        </div>
      </Comp>
    );
  }
};

export default withRouter(Start);
