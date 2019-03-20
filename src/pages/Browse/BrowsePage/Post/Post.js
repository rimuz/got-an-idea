import React, { Component } from 'react';
import styles from './Post.module.scss';
import { withRouter } from 'react-router-dom';

import { ReactComponent as UserImage } from '../../assets/user.svg';
import VoteShareBar from '../../VoteShareBar/VoteShareBar';

class Post extends Component {
  clickHandler = () => {
    this.props.history.push('/browse/post/' + this.props.id);
  };

  render() {
    const {
      id, title, strippedBody, name, upvotes, downvotes,
      comments, color, vote
    } = this.props;

    return (
      <div className={styles.outer}>
        <div onClick={this.clickHandler.bind(this)} style={{ cursor: 'pointer' }}>
          <div className={styles.upper}>
            <UserImage style={{ color }} />

            <div className={styles.nameDate}>
              <h1>{name}</h1>
              <p>10h</p>
            </div>
          </div>

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