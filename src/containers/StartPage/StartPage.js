import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

import Button from '../../components/Button/Button';
import Comp from '../../hoc/Comp/Comp';
import Center from '../../hoc/Center/Center';
import TellMore from './TellMore/TellMore';
import Footer from '../../components/Footer/Footer';
import styles from './StartPage.module.scss';

class StartPage extends Component {
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
        <Center vertical horizontal outer={styles.upper}>
          <div className={styles.inner}>
            <div className={styles.title}>
              Got an idea?
            </div>
            <div className={styles.subtitle}>
                The platform for sharing your billion dollars idea
            </div>

            <Center horizontal>
              <Button clicked={this.tellMeMoreHandler.bind(this)}
                      className={styles.button}>
                Tell me more
              </Button>

              <Button className={styles.button} to="/browse">
                Login
              </Button>

              <Button className={styles.button}>
                Register
              </Button>
            </Center>
          </div>
        </Center>

        <div className={styles.bottom} ref={this.tellMoreRef}>
          <TellMore />
          <Footer />
        </div>
      </Comp>
    );
  }
};

export default withRouter(StartPage);
