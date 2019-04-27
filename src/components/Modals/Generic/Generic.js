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