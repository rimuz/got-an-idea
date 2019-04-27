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
import styles from './Post.module.scss';
import { withRouter } from 'react-router-dom';
import Sugar from 'sugar';

import { ReactComponent as UserImage } from '../../assets/user.svg';
import VoteShareBar from '../../VoteShareBar/VoteShareBar';
import Tags from '../../Tags/Tags';

class Post extends Component {
  clickHandler = () => {
    this.props.history.push('/browse/post/' + this.props.id);
  };

  render() {
    const {
      id, title, strippedBody, name, upvotes, downvotes,
      comments, color, vote, tags, time
    } = this.props;

    const date = Sugar.Date.create(time, { fromUTC: true });
    const dateString = Sugar.Date.relative(date);

    return (
      <div className={styles.outer}>
        <div onClick={this.clickHandler.bind(this)} style={{ cursor: 'pointer' }}>
          <div className={styles.upper}>
            <UserImage style={{ color }} />

            <div className={styles.nameDate}>
              <h1>{name}</h1>
              <p>{dateString}</p>
            </div>
          </div>

          <Tags tags={tags} />
          
          <h1>{title}</h1>
          <div className={styles.body}>
            {strippedBody}
          </div>
        </div>

        <VoteShareBar upvotes={upvotes} downvotes={downvotes} comments={comments}
                      postId={id} vote={vote} />
      </div>
    );
  }
}

export default withRouter(Post);