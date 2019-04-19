import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import Sugar from 'sugar';

import styles from './Login.module.scss';
import Loading from '../../../components/Loading/Loading';
import { openModal, closeModal, login } from '../../../redux/actions';
import { withCookies } from 'react-cookie';

class Login extends Component {
  state = {
    email: "",
    emailError: undefined,
    password: "",
    loading: false,
  }

  constructor(props){
    super(props);
    this.checkboxRef = React.createRef();
  }
  
  keyPressHandler = e => {
    if(e.key === 'Enter'){
      this.loginHandler();
    }
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
    const { closeModal, login, args, cookies } = this.props;
    const { email, password, emailError } = this.state;
    const storeToken = this.checkboxRef.current.value;
    
    if(email === "" || password === "" || emailError)
      return;

    axios.post('/user/login', {
      email, password
    })
    .then(response => {
      const { jwt, userData } = response.data;

      login(jwt, userData);
      if(storeToken){
        cookies.set('jwt', jwt, {
          expires: Sugar.Date.create('in a month')
        })
      }
      
      closeModal();
      args.then();
    })
    .catch(error => {
      const { response } = error;
      const msg = response ? ("Error: " + response.data.message) : "Connection error";
      
      this.setState({
        ...this.state,
        error: msg,
        loading: false,
      });
    });

    this.setState({
      ...this.state,
      loading: true,
    })
    
  };

  changeHandler = event => {
    const { value, name } = event.target;
    
    if(name === 'email'){
      var emailError = undefined;
      
      if(value !== "" && !value.match(/^[\w.]+@([\w-]+\.)+[\w-]{2,4}$/))
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
        {this.state.error ?
          <p className={styles.errorMsg}> {this.state.error} </p>
          : null}

        <input name="email" type="text" placeholder="Email"
          className={styles.email} onChange={this.changeHandler}/>

        {this.state.emailError ?
          <p className={styles.errorMsg}> {this.state.emailError} </p>
          : null}

        <input name="password" type="password" placeholder="Password"
          className={styles.password} onChange={this.changeHandler} 
          onKeyPress={this.keyPressHandler} />
        
        <div className={styles.textAndCheckBox}>
          <div>
            No account? <a href="/user/sign-up" onClick={this.closeHandler}>Sign up</a>
          </div>
          
          <label>
            <input type="checkbox" defaultChecked ref={this.checkboxRef} />
            Remember me
          </label>
        </div>
        <div className={styles.recover}>
          <a href="#top" onClick={this.forgotHandler}>Forgot password</a>
        </div>
        
        { this.state.loading ? <Loading /> :
          <div className={styles.buttons}>
            <button className={styles.cancel} onClick={this.cancelHandler}>Cancel</button>
            <button className={styles.login} onClick={this.loginHandler}>Log in</button>
          </div> }

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
  login: (token, userData) => dispatch(login(token, userData)),
});

export default connect(mapStateToProps, mapDispatchToProps)(withCookies(Login));