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
    const color = `hsl(${hue}, ${sat}%, ${light}%)`;

    const {
      openColorChoose, openChangePassword,
      openDeleteAccount,
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
                  <button onClick={openDeleteAccount}
                    className={styles.delete}>Delete Account</button>
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
  openDeleteAccount: () => dispatch(openModal('DELETE_ACCOUNT', 'Permanently delete account')),
  logout: () => dispatch(logout()),
});

export default connect(mapStateToProps, mapDispatchToProps)(withCookies(User));