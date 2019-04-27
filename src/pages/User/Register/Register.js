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
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import axios from 'axios';

import Boiler from '../../../components/Boiler/Boiler';
import Loading from '../../../components/Loading/Loading';
import styles from './Register.module.scss';
import { openModal } from '../../../redux/actions/modals';

const defaultValue = {
  value: "",
  error: undefined,
}

const defaultState = {
  fields: {
    username: defaultValue,
    email: defaultValue,
    confirmEmail: defaultValue,
    password: defaultValue,
    confirmPassword: defaultValue,
  },
  
  loading: false,
};

class Register extends Component {
  state = JSON.parse(JSON.stringify(defaultState))

  resetState = () => {
    this.setState(JSON.parse(JSON.stringify(defaultState)))
  }

  changeHandler = event => {
    const { fields } = this.state;
    const { name } = event.target;
    var { value } = event.target;
    var error = undefined;

    if(value !== ""){
      switch(name){
        case 'username':
          value = value.replace(/\s/g, '_').replace(/[^A-Za-z_$0-9]/g, '').toLowerCase();
          
          if(value.length < 4)
            error = "Username must be long at least 4 characters.";
          break;
        
        case 'email':
          if(!value.match(/^[\w.]+@([\w-]+\.)+[\w-]{2,4}$/))
            error = "Invalid email.";
          break;
        
        case 'confirmEmail':
          if(value !== fields.email.value)
            error = "Emails don't match.";
          break;
        
        case 'password':
          if(value.length < 10)
            error = "Password too short.";
          else if(value.length > 200)
            error = "Password too long.";
          else if (!value.match(/[A-Z]/))
            error = "Password must contain at least one uppercase letter.";
          else if (!value.match(/[a-z]/))
            error = "Password must contain at least one lowercase letter.";
          else if (!value.match(/[0-9]/))
            error = "Password must contain at least one number.";
          break;
        
        case 'confirmPassword':
          if(value !== fields.password.value)
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
      if (name === 'password') {
        this.changeHandler({
          target: {
            name: 'confirmPassword',
            value: fields.confirmPassword.value,
          }
        });
      }
    });
  }

  nextHandler = () => {
    const { openInputError, openSuccess, openConnectionError } = this.props;
    const { fields } = this.state; 

    const keys = Object.keys(fields);

    if (keys.some(key => fields[key].value === "")){
      openInputError("Please fill all the text fields!");
      return;
    }

    const error = keys.find(key => fields[key].error !== undefined);
    if(error){
      openInputError(fields[error].error);
      return;
    }
    
    // no errors, send POST request to the server
    axios.post('/user/register', {
      name: fields.username.value,
      email: fields.email.value,
      password: fields.password.value, 
    })
    .then(response => {
      this.resetState();
      openSuccess();
    })
    .catch(error => {
      if(error.response)
        openInputError(error.response.data.message);
      else
        openConnectionError();
    
      this.setState({
        ...this.state,
        loading: false,
      });
    });

    this.setState({
      ...this.state,
      loading: true,
    });
  }

  render() {
    const { isLoggedIn } = this.props;
    const { fields } = this.state;
    
    if(isLoggedIn)
      return <Redirect to="/user" />

    return (
      <Boiler>
        <div className={styles.outer}>
          <div className={styles.upper}>
            <div className={styles.text}>
              Register
            </div>
          </div>

          <div className={styles.content}>
            <p>
              The username can't contain spaces and must be long at least 4 characters.
            </p>
            
            <input name="username" type="text" placeholder="Username" autocomplete="off"
              value={fields.username.value} onChange={this.changeHandler} />
            
            { fields.username.error ?
              <p className={styles.errorMsg}> {fields.username.error} </p>
            : null}
            
            <p>
              Please type a valid email.
            </p>
            <input name="email" type="text" placeholder="Email"
              value={fields.email.value} onChange={this.changeHandler} />
            
            {fields.email.error ?
              <p className={styles.errorMsg}> {fields.email.error} </p>
            : null}

            <input name="confirmEmail" type="text" placeholder="Confirm Email" autocomplete="off"
              value={fields.confirmEmail.value} onChange={this.changeHandler} />
            
            {fields.confirmEmail.error ?
              <p className={styles.errorMsg}> {fields.confirmEmail.error} </p>
            : null}


            <p>
              The password must be long between 10 and 200 characters and must contain
              both letters (at least one uppercase and one lowercase) and numbers.
            </p>
            <input name="password" type="password" placeholder="Password" autocomplete="off"
              value={fields.password.value} onChange={this.changeHandler} />
            
            {fields.password.error ?
              <p className={styles.errorMsg}> {fields.password.error} </p>
            : null}

            <input name="confirmPassword" type="password" placeholder="Confirm Password"
              autoComplete="off" value={fields.confirmPassword.value}
              onChange={this.changeHandler} />

            {fields.confirmPassword.error ?
              <p className={styles.errorMsg}> {fields.confirmPassword.error} </p>
            : null}

            { this.state.loading ? <Loading /> :
              <button className={styles.next} onClick={this.nextHandler}>
                Next
              </button> }

            </div>
        </div>
      </Boiler>
    );
  }
};

const stateToProps = state => ({
  ...state.auth,
  ...state.modals
});

const dispatchToProps = dispatch => ({
  openInputError: msg => dispatch(openModal('GENERIC', 'Error', {
    msg, style: 'error',
    right: { msg: 'Got it!' }
  })),

  openSuccess: () => dispatch(openModal('GENERIC', 'Success', {
    msg: 'Account registered. Please check your email and click the link we sent.',
    style: 'success', right: { msg: 'Awesome!' }
  })),

  openConnectionError: () => dispatch(openModal('GENERIC', 'Terrible error', {
    msg: 'Transaction failed. Please check your internet connection and try again in a few minutes.',
    style: 'error', right: { msg: 'Yes, Sir' }
  }))
});

export default connect(stateToProps, dispatchToProps)(Register);