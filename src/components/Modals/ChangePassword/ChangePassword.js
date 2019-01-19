import React, { Component } from 'react';
import { connect } from 'react-redux';

import { openModal, closeModal } from '../../../redux/actions';
import styles from './ChangePassword.module.scss';

class ChangePassword extends Component {
  cancelHandler = () => {
    const { closeModal } = this.props;
    closeModal();
  };

  applyHandler = () => {
    const { closeModal } = this.props;
    closeModal();
  }

  forgotHandler = () => {
    const { openForgotPassword } = this.props;
    openForgotPassword();
  };

  render(){
    return (
      <div className={styles.outer}>
        <input type="password" placeholder="Old Password" className={styles.password} />
        <input type="password" placeholder="New Password" className={styles.password} />
        <input type="password" placeholder="Confirm Password" className={styles.password} />

        <div className={styles.recover}>
          <a href="#" onClick={this.forgotHandler}>Forgot password</a>
        </div>

        <div className={styles.buttons}>
          <button className={styles.cancel} onClick={this.cancelHandler}>Cancel</button>
          <button className={styles.apply} onClick={this.applyHandler}>Apply</button>
        </div>
      </div>
    );
  }
};

const mapDispatchToProps = dispatch => ({
  closeModal: () => dispatch(closeModal()),
  openForgotPassword: () => dispatch(openModal('FORGOT_PASSWORD', 'Forgot Password')),
});
export default connect(null, mapDispatchToProps)(ChangePassword);