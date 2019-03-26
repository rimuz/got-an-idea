import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withCookies } from 'react-cookie';

import { ReactComponent as UserImage } from '../Browse/assets/user.svg';
import PleaseLogIn from '../../components/PleaseLogIn/PleaseLogIn';
import Boiler from '../../components/Boiler/Boiler';
import styles from './User.module.scss';
import { openModal, logout } from '../../redux/actions';

class User extends Component {
  logoutHandler = () => {
    const { cookies, logout } = this.props;
    logout();
    cookies.remove('jwt');
  }

  render() {
    const { userData } = this.props;
    const { hue, light, sat } = userData.color;
    const color = `hsl(${hue}, ${light}%, ${sat}%)`;

    const {
      openColorChoose, openChangePassword
    } = this.props;

    return (
      <PleaseLogIn>
        <Boiler>
          <div className={styles.outer}>
            <div className={styles.upper}>
              <div className={styles.text}>
                Your account
              </div>
            </div>

            <div className={styles.picAndInfo}>
              <UserImage style={{ color }}/>

              <div className={styles.right}>
                <div className={styles.info}>
                  <h3>username:</h3>
                  <h2>{userData.name}</h2>
                  
                  <h3>email:</h3>
                  <h2>{userData.email}</h2>
                </div>
              
                <div className={styles.buttons}>
                  <button onClick={openColorChoose}>Change Color</button>
                  <button onClick={openChangePassword}>Change Password</button>
                  <button onClick={this.logoutHandler}>Log out</button>
                  <button className={styles.delete}>Delete Account</button>
                </div>
              </div>
            </div>
          </div> 
        </Boiler>
      </PleaseLogIn>
    );
  }
};

const mapStateToProps = state => ({
  ...state.auth, ...state.modals,
});

const mapDispatchToProps = dispatch => ({
  openColorChoose: () => dispatch(openModal('COLOR_CHOOSE', 'Choose Color')),
  openChangePassword: () => dispatch(openModal('CHANGE_PASSWORD', 'Change Password')),
  logout: () => dispatch(logout()),
});

export default connect(mapStateToProps, mapDispatchToProps)(withCookies(User));