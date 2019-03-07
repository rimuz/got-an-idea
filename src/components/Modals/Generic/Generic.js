import React, { Component } from 'react';
import { connect } from 'react-redux';

import styles from './Generic.module.scss';
import { closeModal } from '../../../redux/actions';

class Generic extends Component {
  leftHandler = () => {
    const { closeModal, args } = this.props;
    closeModal();
    
    const func = args.left.onClick;
    if(func)
      func();
  };

  rightHandler = () => {
    const { closeModal, args } = this.props;
    closeModal();
    
    const func = args.right.onClick;
    if(func)
      func();
  };
  
  render(){
    const { msg, left, right, style } = this.props.args;

    return (
      <div className={styles.outer}>
        <div className={styles.upper}>
          { style === 'error' || style === 'success' ?
            <div className={styles.emoji}>
              <span role='img' aria-label={style}>
                { style === 'error' ? "⚠️" : "✔️" } 
              </span>
            </div>
            : null
          }

          <div className={styles.text}>
            { msg }
          </div>
        </div>

        <div className={styles.buttons}>
          { left ?
            <button className={styles.left} onClick={this.leftHandler}>
              {left.msg}
            </button>
          : null }
          
          { right ?
            <button className={styles.right} onClick={this.rightHandler}>
              {right.msg}
            </button>
          : null }
        </div>
      </div>
    );
  }
};

const mapStateToProps = state => ({
  ...state.modals
});

const mapDispatchToProps = dispatch => ({
  closeModal: () => dispatch(closeModal()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Generic);