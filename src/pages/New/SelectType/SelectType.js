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
import styles from './SelectType.module.scss';

import { newPageNext, newPageSetPostType, newPageResetStage } from '../../../redux/actions';
import Boiler from '../../../components/Boiler/Boiler';

class SelectType extends Component {
  clickHandler = (type) => {
    const { setType, next, /* resetStage, postType, */ history, stage } = this.props;

    /* if(postType !== undefined && postType !== type)
      resetStage(); */
    setType(type);
    next();
    history.push(`/post/${stage + 1}`);
  };

  render() {
    return (
      <Boiler>
        <div className={styles.page}>
          <div className={styles.text}>
            Select type of the post:
          </div>

          <div className={styles.outer}>
            <div className={styles.idea} onClick={this.clickHandler.bind(null, "idea")}>
              <h2>Idea</h2>

              <p>
                You thought of a concept for a new product
                you want to be realized but you haven't started working on it yet.
                Ideas include proposals for videogames, websites, books, movies and so on..
              </p>

              <p>
                Your post can inspire other people who eventually can make it real.
              </p>
            </div>

            <div className={styles.project} onClick={this.clickHandler.bind(null, "project")}>
              <h2>Project</h2>

              <p>
                You are going to work or alredy working on a certain product, so you
                want to build a community around it and get some feedback.
              </p>

              <p>
                You also want to keep the interested ones up to date with your progress.
              </p>
            </div>
          </div>
        </div>
      </Boiler>
    );
  }
}

const mapStateToProps = state => state.newPage;
const mapDispatchToProps = dispatch => ({
  setType: type => dispatch(newPageSetPostType(type)),
  resetStage: () => dispatch(newPageResetStage()),
  next: () => dispatch(newPageNext()),
});

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(SelectType));

