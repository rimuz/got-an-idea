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
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import { openModal } from '../../redux/actions';
import Boiler from '../Boiler/Boiler';
import styles from './PleaseLogin.module.scss';

class PleaseLogIn extends Component {
  loginHandler = () => {
    const { openLogin } = this.props;
    openLogin();
  };

  signupHandler = () => {
    const { history } = this.props;
    history.push('/user/sign-up');
  };
  
  render() {
    const { isLoggedIn } = this.props;

    if(!isLoggedIn)
      return (
        <Boiler>
          <div className={styles.outer}>
            <div className={styles.content}>
              <p className={styles.notLogged}>
                This section is available only for registered accounts.
              </p>

              <div>
                <button className={styles.login} onClick={this.loginHandler}>
                  Log In
                </button>

                <button className={styles.signup} onClick={this.signupHandler}>
                  Sign Up
                </button>
              </div>
            </div>
          </div>
        </Boiler>
      );

    return this.props.children;
  }
}

const mapStateToProps = state => ({
  ...state.auth, ...state.modals,
});

const mapDispatchToProps = dispatch => ({
  openLogin: () => dispatch(openModal('LOGIN', 'Log in', { then: () => {} })),
});

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(PleaseLogIn));