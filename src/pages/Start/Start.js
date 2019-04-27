/*
 *  Copyright 2019 Riccardo Musso
 *
 *  Licensed under the Apache License, Version 2.0 (the "License");
 *  you may not use this file except in compliance with the License.
 *  You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 *  Unless required by applicable law or agreed to in writing, software
 *  distributed under the License is distributed on an "AS IS" BASIS,
 *  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *  See the License for the specific language governing permissions and
 *  limitations under the License.
 *
*/

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
