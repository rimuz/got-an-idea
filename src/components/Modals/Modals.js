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
import styles from './Modals.module.scss';

import { closeModal } from '../../redux/actions';
import Share from './Share/Share';
import Login from './Login/Login';
import ColorChoose from './ColorChoose/ColorChoose';
import ChangePassword from './ChangePassword/ChangePassword';
import ForgotPassword from './ForgotPassword/ForgotPassword';
import Generic from './Generic/Generic';
import Report from './Report/Report';
import DeleteAccount from './DeleteAccount/DeleteAccount';

const modalList = {
  SHARE: Share,
  LOGIN: Login,
  COLOR_CHOOSE: ColorChoose,
  CHANGE_PASSWORD: ChangePassword,
  FORGOT_PASSWORD: ForgotPassword,
  DELETE_ACCOUNT: DeleteAccount,
  GENERIC: Generic,
  REPORT: Report,
};

class Modals extends Component {
  closeHandler = event => {
    const { closeModal } = this.props;
    closeModal();
  };

  innerClickHandler = event => {
    event.stopPropagation();
  };
  
  render(){
    const { isModalOpen, modalType, modalTitle } = this.props;

    if(!isModalOpen)
      return null;

    const Modal = modalList[modalType];

    return (
      <div className={styles.outer} onClick={this.closeHandler}>
        <div className={styles.inner} onClick={this.innerClickHandler}>
          <div className={styles.upper}>
            <div className={styles.title}>{modalTitle}</div>
            <div className={styles.close} onClick={this.closeHandler}>
              <span role='img' aria-label='close'>❌</span>
            </div>
          </div>

          <Modal />
        </div>
      </div>
    );
  }
} 


const mapStateToProps = state => state.modals;
const mapDispatchToProps = dispatch => ({
  closeModal: () => dispatch(closeModal()),
});
export default connect(mapStateToProps, mapDispatchToProps)(Modals); 