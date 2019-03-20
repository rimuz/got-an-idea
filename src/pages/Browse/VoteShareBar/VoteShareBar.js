import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import axios from 'axios';

import { ReactComponent as Upvote } from '../assets/upvote.svg';
import { ReactComponent as Comment } from '../assets/comment.svg';
import { ReactComponent as Share } from '../assets/share.svg';
import { openModal } from '../../../redux/actions';
import styles from './VoteShareBar.module.scss';

class VoteShareBar extends Component {
  state = {
    vote: undefined,
  };
  
  voteHandler = isUpvote => {
    const { postId, isLoggedIn, openLogin } = this.props;

    if(!isLoggedIn){
      openLogin();
      return;
    }

    axios.post('/user/vote', {
      target: 'p',
      uuid: postId,
      value: isUpvote ? '+1' : '-1',
    })
      .then(response => {
        this.setState({
          vote: isUpvote | 0 // bool -> int
        });
      })
      .catch(error => {
        this.setState({
          vote: undefined
        });
      })
  };

  commentHandler = () => {
    const { postId, history } = this.props;
    history.push("/browse/post/" + postId);
  };

  shareHandler = () => {
    const { openShare, postId } = this.props;
    openShare(postId);
  };

  render(){
    const { comments, upvotes, downvotes } = this.props;
    
    return (
      <div className={comments ? styles.withComment : styles.withoutComment}>

        <div className={styles.btnContainer}>
          <div className={styles.btn} onClick={this.voteHandler.bind(null, true)}>
            <Upvote className={this.state.vote === 0 ? styles.selected : ""}/>
            <span>{upvotes}</span>
          </div>

          <div className={styles.btn} onClick={this.voteHandler.bind(null, false)}>
            <Upvote className={styles.upsideDown + (this.state.vote === 1 ? styles.selected : "")} />
            <span>{downvotes}</span>
          </div>
        </div>

        { comments ?
          <div className={styles.btnContainer}>
            <div className={styles.btn} onClick={this.commentHandler}>
              <Comment />
              <span>{comments}</span>
            </div>
          </div>
        : null }

        <div className={styles.btnContainer}>
          <div className={styles.btn} onClick={this.shareHandler}>
            <Share className={styles.share} />
            <span className={styles.optional}>Share</span>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  ...state.auth, ...state.modals
});

const mapDispatchToProps = dispatch => ({
  openShare: postId => dispatch(openModal('SHARE', 'Share', {postId})),
  openLogin: () => dispatch(openModal('LOGIN', 'Log in'))
});

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(VoteShareBar));