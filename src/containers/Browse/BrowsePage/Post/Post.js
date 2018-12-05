import React, { Component } from 'react';
import styles from './Post.module.scss';
import { withRouter } from 'react-router-dom';

import { ReactComponent as User } from '../../assets/user.svg';
import { ReactComponent as Upvote } from '../../assets/upvote.svg';
import { ReactComponent as Comment } from '../../assets/comment.svg';
import { ReactComponent as Building } from '../../assets/building.svg';
import { ReactComponent as Share } from '../../assets/share.svg';


class Post extends Component {
  clickHandler = () => {
    this.props.history.push('/browse/post/' + this.props.id);
  };

  render() {
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

          <h1>{this.props.title}</h1>
          <div className={styles.body}>
            {this.props.body}
          </div>
        </div>

        <div className={styles.lower}>
          <div className={styles.btnContainer}>
            <div className={styles.btn}>
              <Upvote />
              <span>{this.props.upvotes}</span>
            </div>
            
            <div className={styles.btn}>
              <Upvote className={styles.upsideDown} />
              <span>{this.props.downvotes}</span>  
            </div>
          </div>

          <div className={styles.btnContainer}>
            <div className={styles.btn}>
              <Comment />
              <span>{this.props.comments}</span>
            </div>

            <div className={styles.btn}>
              <Building />
              <span>{this.props.building}</span>
            </div>
          </div>
          
          <div className={styles.btnContainer}>
            <div className={styles.btn}>
              <Share className={styles.share}/>
              <span className={styles.aoptional}>Share</span>
            </div>
          </div>

        </div>
      </div>
    );
  }
}

export default withRouter(Post);