import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

import Button from '../../components/Button/Button';
import Comp from '../../components/Comp/Comp';
import Center from '../../components/Center/Center';
import TellMore from './TellMore/TellMore';
import Footer from '../../components/Boiler/Footer/Footer';
import styles from './Start.module.scss';

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
        <Center vertical horizontal outer={styles.upper} inner={styles.inner}
                minHeight='100vh'>

            <h1>Got an idea?</h1>
            <p>
              The platform for sharing your billion dollar idea
            </p>

            <span>
              <Button clicked={this.tellMeMoreHandler}
                      className={styles.button}>
                Tell me more
              </Button>

              <Button className={styles.button} to="/browse">
                Let's start!
              </Button>
            </span>
        </Center>

        <div className={styles.bottom} ref={this.tellMoreRef}>
          <TellMore />
          <Footer />
        </div>
      </Comp>
    );
  }
};

export default withRouter(Start);
