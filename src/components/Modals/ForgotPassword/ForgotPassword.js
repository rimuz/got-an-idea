import React, { Component } from 'react';
import { connect } from 'react-redux';

import { closeModal } from '../../../redux/actions';
import styles from './ForgotPassword.module.scss';

class ForgotPassword extends Component {
  cancelHandler = () => {
    const { closeModal } = this.props;
    closeModal();
  }
  
  render(){
    return (
      <div className={styles.outer}>
        <p>
          In order to reset your password, please insert your email address below
          and click the link we'll send you. It will be valid for at maximum the
          next 24 hours.
        </p>

        <input type="text" placeholder="Email" className={styles.email} />

        <div className={styles.buttons}>
          <div className={styles.buttons}>
            <button className={styles.cancel} onClick={this.cancelHandler}>Cancel</button>
            <button className={styles.send} onClick={this.sendHandler}>Send Link</button>
          </div>
        </div>
      </div>
    );
  }
};

const mapStateToProps = state => state.auth;
const mapDispatchToProps = dispatch => ({
  closeModal: () => dispatch(closeModal()),
});

export default connect(mapStateToProps, mapDispatchToProps)(ForgotPassword);