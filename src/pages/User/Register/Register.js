import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import Boiler from '../../../components/Boiler/Boiler';
import styles from './Register.module.scss';

class Register extends Component {
  state = {
    username: "",
    email: "",
    confirmEmail: "",
    password: "",
    confirmPassword: "",
  };

  changeHandler = event => {
    const { name } = event.target;
    var { value } = event.target;

    switch(name){
      case 'username':
        value = value.replace(/\s/g, '_').replace(/[^A-Za-z_$0-9]/g, '');
        break;
      }

    this.setState({ [name]: value });
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

          <div className={styles.card}>
            <p>
              The username can't contain spaces and special characters and must be at least of
              length 4.
            </p>
            
            <input name="username" type="text" placeholder="Username" value={this.state.username}
              onChange={this.changeHandler} />
            
            <p>
              Please type a valid email.
            </p>
            <input name="email" type="text" placeholder="Email" value={this.state.email}
              onChange={this.changeHandler} />
            <input name="confirmEmail" type="text" placeholder="Confirm Email" value={this.state.confirmEmail}
              onChange={this.changeHandler} />
            
            <p>
              The password must be at least of length 6 and must contain both letters and numbers.
            </p>
            <input name="password" type="password" placeholder="Password" value={this.state.password}
              onChange={this.changeHandler} />
            <input name="confirmPassword" type="password" placeholder="Confirm Password" value={this.state.confirmPassword}
              onChange={this.changeHandler} />

            <button className={styles.next}>Next</button>
          </div>
        </div>
      </Boiler>
    );
  }
};

const stateToProps = state => state.auth;
export default connect(stateToProps, null)(Register);