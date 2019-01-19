import React, { Component } from 'react';
import styles from './Post.module.scss';
import { withRouter } from 'react-router-dom';

import { ReactComponent as User } from '../../assets/user.svg';
import VoteShareBar from '../../VoteShareBar/VoteShareBar';

class Post extends Component {
  clickHandler = () => {
    this.props.history.push('/browse/post/' + this.props.id);
  };

  render() {
    const { id, title, body } = this.props;

    return (
      <div className={styles.outer}>
        <div onClick={this.clickHandler.bind(this)} style={{ cursor: 'pointer' }}>
          <div className={styles.upper}>
            <User />

            <div className={styles.nameDate}>
              <h1>Nome Dell'Utente buffo</h1>
              <p>10h</p>
            </div>
          </div>

          <h1>{title}</h1>
          <div className={styles.body}>
            {body}
          </div>
        </div>

        <VoteShareBar upvotes="100" downvotes="330" comments="100" postId={id} />
      </div>
    );
  }
}

export default withRouter(Post);