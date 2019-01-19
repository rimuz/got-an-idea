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
        </Boiler>
      );

    return this.props.children;
  }
}

const mapStateToProps = state => ({
  ...state.auth, ...state.modals,
});

const mapDispatchToProps = dispatch => ({
  openLogin: () => dispatch(openModal('LOGIN', 'Log in', { then: () => {} }))
});

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(PleaseLogIn));