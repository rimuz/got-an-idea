import React, { Component } from 'react';
import { connect } from 'react-redux';
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
    const { openInputError, openSuccess, openConnectionError, userData } = this.props;
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
        this.resetState();
        logout();
        openSuccess();
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
      password: event.value, 
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
    msg: 'Transaction failed. Please check your internet connection and wait a few minutes.',
    style: 'error', right: { msg: 'Yes, Sir' }
  }))
});
export default connect(mapStateToProps, mapDispatchToProps)(DeleteAccount);