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
import { withRouter } from 'react-router';
import { connect } from 'react-redux';

import styles from './SelectStage.module.scss';
import Boiler from '../../../components/Boiler/Boiler';
import { newPageNext, newPageSetPostStage } from '../../../redux/actions';

import projectStages from './projectStages';
import ideaStages from './ideaStages';

class ProjectStage extends Component {
  previousHandler = () => {
    const { history, stage } = this.props;
    history.push(`/post/${stage - 1}`);
  };
  
  clickHandler = name => {
    const { stage, history, setStage, next } = this.props;
    
    setStage(name);
    next();
    history.push(`/post/${stage + 1}`);
  };

  render() {
    const { postType } = this.props;
    const stages = postType === 'project' ? projectStages : ideaStages;

    return (
      <Boiler>
        <div className={styles.page}>
          <div className={styles.upper}>
            <div className={styles.text}>
              {`Select stage of the ${postType}:`}
            </div>

            <button onClick={this.previousHandler} className={styles.previous}>Previous</button>                  
          </div>

          <div className={styles.outer}>
            <div className={styles.lower}>
              <div className={styles.container}>
                {
                  stages.map(stage => (
                    <div className={styles.option} stage={stage.shortName}
                        onClick={this.clickHandler.bind(null, stage.shortName)} key={stage.shortName}>
                      <h1>{stage.title}</h1>
                      <h2>@{stage.shortName}</h2>
                      <p>{stage.desc}</p>
                    </div>
                  ))
                }
              </div>
              
              <button onClick={this.previousHandler} className={styles.previous}>Previous</button>
            </div>
          </div>
        </div>
      </Boiler>
    );
  }
}

const mapStateToProps = state => state.newPage;
const mapDispatchToProps = dispatch => ({
  setStage: name => dispatch(newPageSetPostStage(name)),
  next: () => dispatch(newPageNext()),
});
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(ProjectStage));