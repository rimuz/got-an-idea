import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import Boiler from '../../../components/Boiler/Boiler';
import styles from './Register.module.scss';
import { openModal } from '../../../redux/actions/modals';
import { axiosInstance } from '../../..';

const defaultValue = {
  value: "",
  valid: false,
  error: undefined,
}

const defaultState = {
  username: defaultValue,
  email: defaultValue,
  confirmEmail: defaultValue,
  password: defaultValue,
  confirmPassword: defaultValue
};

class Register extends Component {
  // deep copy
  state = JSON.parse(JSON.stringify(defaultState))

  resetState = () => {
    this.state = JSON.parse(JSON.stringify(defaultState));
  }

  changeHandler = event => {
    const { name } = event.target;
    var { value } = event.target;
    var error = undefined;

    if(value !== ""){
      switch(name){
        case 'username':
          value = value.replace(/\s/g, '_').replace(/[^A-Za-z_$0-9]/g, '');
          
          if(value.length < 4)
            error = "Username must be long at least 4 characters.";
          break;
        
        case 'email':
          if(!value.match(/^[\w\.]+@([\w\-]+\.)+[\w\-]{2,4}$/))
            error = "Invalid email.";
          break;
        
        case 'confirmEmail':
          if(value !== this.state.email.value)
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
          if(value !== this.state.password.value)
            error = "Passwords don't match.";
          break;

        default: // this is ridiculous!
          break;
      }
    }

    this.setState({
      ...this.state,
    
      [name]: {
        ...this.state[name],
        value, error
      }
    });
  }

  nextHandler = () => {
    const { openInputErrorModal, openSuccessModal,
      openConnectionErrorModal } = this.props;

    const keys = Object.keys(this.state);

    if(keys.some(key => this.state[key].value === "")){
      openInputErrorModal("Please fill all the text fields!");
      return;
    }

    const error = keys.find(key => this.state[key].error !== undefined);
    if(error){
      openInputErrorModal(this.state[error].error);
      return;
    }

    // no errors, send POST request to the server
    axiosInstance.post('/user/register', {
      name: this.state.username.value,
      email: this.state.email.value,
      password: this.state.password.value, 
    })
      .then(response => {
        this.resetState();
        openSuccessModal();
      })
      .catch(error => {
        if(error.response)
          openInputErrorModal(error.response.data.message);
        else
          openConnectionErrorModal();
      });
  }

  render() {
    const { isLoggedIn } = this.props;
    
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
              value={this.state.username.value} onChange={this.changeHandler} />
            
            { this.state.username.error ?
              <p className={styles.errorMsg}> {this.state.username.error} </p>
            : null}
            
            <p>
              Please type a valid email.
            </p>
            <input name="email" type="text" placeholder="Email"
              value={this.state.email.value} onChange={this.changeHandler} />
            
            {this.state.email.error ?
              <p className={styles.errorMsg}> {this.state.email.error} </p>
            : null}

            <input name="confirmEmail" type="text" placeholder="Confirm Email" autocomplete="off"
              value={this.state.confirmEmail.value} onChange={this.changeHandler} />
            
            {this.state.confirmEmail.error ?
              <p className={styles.errorMsg}> {this.state.confirmEmail.error} </p>
            : null}


            <p>
              The password must be long between 10 and 200 characters and must contain
              both letters (at least one uppercase and one lowercase) and numbers.
            </p>
            <input name="password" type="password" placeholder="Password" autocomplete="off"
              value={this.state.password.value} onChange={this.changeHandler} />
            
            {this.state.password.error ?
              <p className={styles.errorMsg}> {this.state.password.error} </p>
            : null}

            <input name="confirmPassword" type="password" placeholder="Confirm Password"
              autocomplete="off" value={this.state.confirmPassword.value}
              onChange={this.changeHandler} />

            {this.state.confirmPassword.error ?
              <p className={styles.errorMsg}> {this.state.confirmPassword.error} </p>
            : null}

            <button className={styles.next} onClick={this.nextHandler}>Next</button>
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
  openInputErrorModal: msg => dispatch(openModal('GENERIC', 'Error', {
    msg, style: 'error',
    right: { msg: 'Got it!' }
  })),

  openSuccessModal: () => dispatch(openModal('GENERIC', 'Success', {
    msg: 'Account registered. Please check your email and click the link we sent.',
    style: 'success', right: { msg: 'Awesome!' }
  })),

  openConnectionErrorModal: () => dispatch(openModal('GENERIC', 'Terrible error', {
    msg: 'Transaction failed. Please check your internet connection and wait a few minutes.',
    style: 'error', right: { msg: 'Yes, Sir' }
  }))
});

export default connect(stateToProps, dispatchToProps)(Register);