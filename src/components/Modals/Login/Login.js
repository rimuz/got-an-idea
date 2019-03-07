import React, { Component } from 'react';
import { connect } from 'react-redux';

import styles from './Login.module.scss';
import { openModal, closeModal, login } from '../../../redux/actions';
import { axiosInstance } from '../../..';

class Login extends Component {
  state = {
    email: "",
    emailError: undefined,
    password: "",
  }

  signUpHandler = () => {
    const { closeModal} = this.props;
    closeModal();
  }

  forgotHandler = () => {
    const { openForgotPassword } = this.props;
    openForgotPassword();
  };
  
  cancelHandler = () => {
    const { closeModal } = this.props;
    closeModal();
  };

  loginHandler = () => {
    const { closeModal, login, args } = this.props;
    
    axiosInstance.post('/user/login', {
      
    })
    
    args.then();
    closeModal();
  };

  changeHandler = event => {
    const { value, name } = event.target;
    
    if(name === 'email'){
      var emailError = undefined;
      
      if(value !== "" && !value.match(/^[\w\.]+@([\w\-]+\.)+[\w\-]{2,4}$/))
        emailError = "Invalid Email."

      this.setState({
        ...this.state,
        email: value,
        emailError  
      });
      
    } else { // password
      this.setState({
        ...this.state,
        password: value,
      });
    }   
  }

  render(){
    return (
      <div className={styles.outer}>
        <input name="email" type="text" placeholder="Email"
          className={styles.email} onChange={this.changeHandler}/>

        {this.state.emailError ?
          <p className={styles.errorMsg}> {this.state.emailError} </p>
          : null}

        <input name="password" type="password" placeholder="Password"
          className={styles.password} onChange={this.changeHandler} />
        
        <div className={styles.textAndCheckBox}>
          <div>
            No account? <a href="/user/sign-up" onClick={this.closeHandler}>Sign up</a>
          </div>
          
          <label>
            <input type="checkbox" defaultChecked />
            Remember me
          </label>
        </div>
        <div className={styles.recover}>
          <a href="#" onClick={this.forgotHandler}>Forgot password</a>
        </div>

        <div className={styles.buttons}>
          <button className={styles.cancel} onClick={this.cancelHandler}>Cancel</button>
          <button className={styles.login} onClick={this.loginHandler}>Log in</button>
        </div>
      </div>
    );
  }
};

const mapStateToProps = state => ({
  ...state.auth, ...state.modals
});

const mapDispatchToProps = dispatch => ({
  openForgotPassword: () => dispatch(openModal('FORGOT_PASSWORD', 'Forgot Password')),
  closeModal: () => dispatch(closeModal()),
  login: () => dispatch(login()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);