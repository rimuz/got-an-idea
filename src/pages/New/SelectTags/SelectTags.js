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
import { withRouter } from 'react-router';

import styles from './SelectTags.module.scss';
import { newPageNext } from '../../../redux/actions';
import Boiler from '../../../components/Boiler/Boiler';
import CheckTag from './CheckTag/CheckTag';
import tags from './tags';

class SelectTags extends Component {
  previousHandler = () => {
    const { history, stage } = this.props;
    history.push(`/post/${stage - 1}`);
  };
  
  nextHandler = () => {
    const { next, history, stage } = this.props;

    next();
    history.push(`/post/${stage + 1}`);
  };

  render(){
    return (
      <Boiler>
        <div className={styles.page}>
          <div className={styles.upper}>
            <div className={styles.text}>
              Select appropriate tags:
            </div>

            <div className={styles.buttons}>
              <button onClick={this.previousHandler} className={styles.previous}>Previous</button>          
              <button onClick={this.nextHandler} className={styles.next}>Next</button>
            </div>
          </div>

          <div className={styles.outer}>
            <div className={styles.lower}>
              <div className={styles.container}> 
                {
                  tags.map(tag => <CheckTag tag={tag} key={tag.name} />)
                }
              </div>
              
              <div className={styles.last}>
                <button onClick={this.previousHandler} className={styles.previous}>Previous</button>
                <button onClick={this.nextHandler} className={styles.next}>Next</button>
              </div>
            </div>
          </div>
        </div>
      </Boiler>
    );
  }

}

const mapStateToProps = state => state.newPage;
const mapDispatchToProps = dispatch => ({
  next: () => dispatch(newPageNext())
});
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(SelectTags));