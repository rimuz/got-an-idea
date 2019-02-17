import React, { Component } from 'react';
import { connect } from 'react-redux';

import { ReactComponent as UserImage } from '../Browse/assets/user.svg';
import Boiler from '../../components/Boiler/Boiler';
import styles from './User.module.scss';

import { openModal } from '../../redux/actions';

class User extends Component {
  colorHandler = () => {
    const { openColorChoose } = this.props;
    openColorChoose();
  }

  passwordHandler = () => {
    const { openChangePassword } = this.props;
    openChangePassword();
  }

  render() {
    const { userData, isLoggedIn } = this.props;
    const { hue, light, sat } = userData.color;
    const color = `hsl(${hue}, ${light}%, ${sat}%)`;

    return (
      //<PleaseLogIn>
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
                  <button onClick={this.colorHandler}>Change Color</button>
                  <button onClick={this.passwordHandler}>Change Password</button>
                  <button className={styles.logout}>Log out</button>
                  <button className={styles.delete}>Delete Account</button>
                </div>
              </div>
            </div>
          </div> 
        </Boiler>
      //</PleaseLogIn>
    );
  }
};

const mapStateToProps = state => ({
  ...state.auth, ...state.modals,
});

const mapDispatchToProps = dispatch => ({
  openColorChoose: () => dispatch(openModal('COLOR_CHOOSE', 'Choose Color')),
  openChangePassword: () => dispatch(openModal('CHANGE_PASSWORD', 'Change Password')),
});

export default connect(mapStateToProps, mapDispatchToProps)(User);