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

import { newPageAddTag, newPageRemoveTag } from '../../../../redux/actions';
import styles from './CheckTag.module.scss';

class CheckTag extends Component {
  clickHandler = () => {
    const { addTag, removeTag, tag, postTags } = this.props;
    const { name } = tag;
    
    if(postTags.indexOf(name) === -1)
      addTag(name)
    else
      removeTag(name);
  };

  render() {
    const { postTags, tag } = this.props;
    const { name, emoji } = tag;
    const checked = postTags.indexOf(name) !== -1;

    return (
      <div className={
        `${styles.tag} ${checked ? styles.checked : ''}`
      } name={name} onClick={this.clickHandler}>
        <h1>#{name}</h1>
        <div>
          <span role='img' aria-label={name}>{emoji}</span>
        </div>
      </div>
    );
  }
};

const mapStateToProps = state => state.newPage;
const mapDispatchToProps = dispatch => ({
  addTag: tag => dispatch(newPageAddTag(tag)),
  removeTag: tag => dispatch(newPageRemoveTag(tag))
});

export default connect(mapStateToProps, mapDispatchToProps)(CheckTag);
