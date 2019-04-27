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
import styles from './ForgotPassword.module.scss';
import Loading from '../../Loading/Loading';

class ForgotPassword extends Component {
  state = {
    email: '',
    loading: false,
  };

  cancelHandler = () => {
    const { closeModal } = this.props;
    closeModal();
  }

  sendHandler = () => {
    const { email } = this.state;
    const { openSuccess, openInputError,
      openConnectionError } = this.props;

    this.setState({
      ...this.state,
      loading: true,
    });

    axios.post('/user/recover/ask', { email })
      .then(openSuccess).catch(error => {
        if(error.response)
          openInputError(error.response.data.message);
        else
          openConnectionError();
      });
  }

  changeHandler = event => {
    this.setState({
      ...this.state,
      email: event.target.value
    });
  }
  
  render(){
    return (
      <div className={styles.outer}>
        <p>
          In order to reset your password, please insert your email address below
          and click the link we'll send you.
        </p>

        <input name="email" type="text" placeholder="Email" className={styles.email}
          value={this.state.email} onChange={this.changeHandler} />

        { this.state.loading ? <Loading/> :
          <div className={styles.buttons}>
            <button className={styles.cancel} onClick={this.cancelHandler}>Cancel</button>
            <button className={styles.send} onClick={this.sendHandler}>Send Link</button>
          </div> }
      </div>
    );
  }
};

const mapStateToProps = state => state.auth;
const mapDispatchToProps = dispatch => ({
  closeModal: () => dispatch(closeModal()),

  openSuccess: () => dispatch(openModal('GENERIC', 'Success', {
    msg: 'Success! Click the link in the email we sent you.',
    style: 'success', right: { msg: 'Ok' }
  })),

  openInputError: msg => dispatch(openModal('GENERIC', 'Error', {
    msg, style: 'error',
    right: { msg: 'Got it!' }
  })),

  openConnectionError: () => dispatch(openModal('GENERIC', 'Terrible error', {
    msg: 'Transaction failed. Please check your internet connection and try again in a few minutes.',
    style: 'error', right: { msg: 'Yes, Sir' }
  }))
});

export default connect(mapStateToProps, mapDispatchToProps)(ForgotPassword);