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
import axios from 'axios';

import { openModal, closeModal } from '../../../redux/actions';
import Loading from '../../Loading/Loading';
import styles from './ChangePassword.module.scss';

const defaultValue = {
  value: "",
  error: undefined,
};

const defaultState = {
  fields: {
    oldPassword: defaultValue,
    newPassword: defaultValue,
    confirmNewPassword: defaultValue,
  },

  loading: false,
};

class ChangePassword extends Component {
  // deep copy
  state = JSON.parse(JSON.stringify(defaultState));

  cancelHandler = () => {
    const { closeModal } = this.props;
    closeModal();
  };

  applyHandler = () => {
    const { openInputError, openSuccess, openConnectionError } = this.props;
    const { fields } = this.state;

    const keys = Object.keys(fields);

    if (keys.some(key => fields[key].value === "")) {
      openInputError("Please fill all the text fields!");
      return;
    }

    const error = keys.find(key => fields[key].error !== undefined);
    if (error) {
      openInputError(fields[error].error);
      return;
    }

    // no errors, send POST request to the server
    axios.post('/user/change-password', {
      oldPassword: fields.oldPassword.value,
      newPassword: fields.newPassword.value,
    })
      .then(response => {
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
    const { fields } = this.state;
    const { name } = event.target;
    var { value } = event.target;
    var error = undefined;

    if (value !== "") {
      switch (name) {
        case 'newPassword':
          if (value.length < 10)
            error = "Password too short.";
          else if (value.length > 200)
            error = "Password too long.";
          else if (!value.match(/[A-Z]/))
            error = "Password must contain at least one uppercase letter.";
          else if (!value.match(/[a-z]/))
            error = "Password must contain at least one lowercase letter.";
          else if (!value.match(/[0-9]/))
            error = "Password must contain at least one number.";
          break;

        case 'confirmNewPassword':
          if (value !== fields.newPassword.value)
            error = "Passwords don't match.";
          break;

        default: // this is ridiculous!
          break;
      }
    }

    this.setState({
      ...this.state,

      fields: {
        ...fields,

        [name]: {
          value, error
        }
      }
    }, () => {
      if (name === 'newPassword') {
        this.changeHandler({
          target: {
            name: 'confirmNewPassword',
            value: fields.confirmNewPassword.value,
          }
        });
      }
    });
  };

  render(){
    const { fields, loading } = this.state;

    return (
      <div className={styles.outer}>
        <input name="oldPassword" type="password" placeholder="Old Password"
          value={fields.oldPassword.value} className={styles.password}
          onChange={this.changeHandler} />

        {fields.oldPassword.error ?
          <p className={styles.errorMsg}> {fields.oldPassword.error} </p>
          : null}
        
        <input name="newPassword" type="password" placeholder="New Password"
          value={fields.newPassword.value} className={styles.password}
          onChange={this.changeHandler} />
        
        {fields.newPassword.error ?
          <p className={styles.errorMsg}> {fields.newPassword.error} </p>
          : null}

        <input name="confirmNewPassword" type="password" placeholder="Confirm Password"
          value={fields.confirmNewPassword.value} className={styles.password}
          onChange={this.changeHandler} />

        {fields.confirmNewPassword.error ?
          <p className={styles.errorMsg}> {fields.confirmNewPassword.error} </p>
          : null}

        <div className={styles.recover}>
          <a href="#top" onClick={this.forgotHandler}>Forgot password</a>
        </div>

        { loading ? <Loading /> :
          <div className={styles.buttons}>
            <button className={styles.cancel} onClick={this.cancelHandler}>Cancel</button>
            <button className={styles.apply} onClick={this.applyHandler}>Apply</button>
          </div> }
      </div>
    );
  }
};

const mapDispatchToProps = dispatch => ({
  closeModal: () => dispatch(closeModal()),
  openForgotPassword: () => dispatch(openModal('FORGOT_PASSWORD', 'Forgot Password')),
  
  openInputError: msg => dispatch(openModal('GENERIC', 'Error', {
    msg, style: 'error',
    right: { msg: 'Got it!' }
  })),

  openSuccess: () => dispatch(openModal('GENERIC', 'Success', {
    msg: 'Password changed.',
    style: 'success', right: { msg: 'Awesome!' }
  })),

  openConnectionError: () => dispatch(openModal('GENERIC', 'Terrible error', {
    msg: 'Transaction failed. Please check your internet connection and try again in a few minutes.',
    style: 'error', right: { msg: 'Yes, Sir' }
  }))
});
export default connect(null, mapDispatchToProps)(ChangePassword);