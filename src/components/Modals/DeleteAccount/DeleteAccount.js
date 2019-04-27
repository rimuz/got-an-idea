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
import { connect } from 'react-redux';
import { withCookies } from 'react-cookie';
import axios from 'axios';

import { openModal, closeModal, logout } from '../../../redux/actions';
import Loading from '../../Loading/Loading';
import styles from './DeleteAccount.module.scss';

class DeleteAccount extends Component {
  state = {
    password: "",
    loading: false,
  };

  cancelHandler = () => {
    const { closeModal } = this.props;
    closeModal();
  };

  confirmHandler = () => {
    const { openInputError, openSuccess, openConnectionError,
        userData, logout, cookies } = this.props;
    const { password } = this.state;
    const { email } = userData;

    if (password === "") {
      openInputError("Please enter your password first!");
      return;
    }

    axios.post('/user/delete', {
      email, password,
    })
      .then(response => {
        logout();
        openSuccess();
        cookies.remove('jwt');
      })
      .catch(error => {
        if (error.response)
          openInputError(error.response.data.message);
        else
          openConnectionError();
      });

    this.setState({
      ...this.state,
      loading: true,
    });
  }

  forgotHandler = () => {
    const { openForgotPassword } = this.props;
    openForgotPassword();
  };

  changeHandler = event => {
    this.setState({
      ...this.state,
      password: event.target.value, 
    });
  };

  render(){
    const { password, loading } = this.state;

    return (
      <div className={styles.outer}>
        <p>
          You're about to delete your account from the platform.
          <strong>This operation cannot be undone. </strong>
          Please enter your password to confirm.
        </p>

        <input name="password" type="password" placeholder="Password"
          value={password} className={styles.password}
          onChange={this.changeHandler} />

        { loading ? <Loading /> :
          <div className={styles.buttons}>
            <button className={styles.cancel} onClick={this.cancelHandler}>Cancel</button>
            <button className={styles.apply} onClick={this.confirmHandler}>Delete Account</button>
          </div> }
      </div>
    );
  }
};

const mapStateToProps = state => state.auth;
const mapDispatchToProps = dispatch => ({
  logout: () => dispatch(logout()),
  closeModal: () => dispatch(closeModal()),
  openForgotPassword: () => dispatch(openModal('FORGOT_PASSWORD', 'Forgot Password')),

  openInputError: msg => dispatch(openModal('GENERIC', 'Error', {
    msg, style: 'error',
    right: { msg: 'Got it!' }
  })),

  openSuccess: () => dispatch(openModal('GENERIC', 'Success', {
    msg: 'Account deleted. Bye bye!',
    style: 'success', right: { msg: 'Awesome!' }
  })),

  openConnectionError: () => dispatch(openModal('GENERIC', 'Terrible error', {
    msg: 'Transaction failed. Please check your internet connection and try again in a few minutes.',
    style: 'error', right: { msg: 'Yes, Sir' }
  }))
});

export default connect(mapStateToProps, mapDispatchToProps)(withCookies(DeleteAccount));