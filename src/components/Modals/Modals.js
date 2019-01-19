import React, { Component } from 'react';
import { connect } from 'react-redux';
import styles from './Modals.module.scss';

import { closeModal } from '../../redux/actions';
import Share from './Share/Share';
import Login from './Login/Login';
import ColorChoose from './ColorChoose/ColorChoose';
import ChangePassword from './ChangePassword/ChangePassword';
import ForgotPassword from './ForgotPassword/ForgotPassword';

const modalList = {
  SHARE: Share,
  LOGIN: Login,
  COLOR_CHOOSE: ColorChoose,
  CHANGE_PASSWORD: ChangePassword,
  FORGOT_PASSWORD: ForgotPassword,
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