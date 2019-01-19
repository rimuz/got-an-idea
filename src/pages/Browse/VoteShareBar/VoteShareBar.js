import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import { loginDispatch, checkLogin } from '../../../utils';
import { ReactComponent as Upvote } from '../assets/upvote.svg';
import { ReactComponent as Comment } from '../assets/comment.svg';
import { ReactComponent as Share } from '../assets/share.svg';
import { openModal } from '../../../redux/actions';
import styles from './VoteShareBar.module.scss';


class VoteShareBar extends Component {
  voteHandler = isUpvote => {
    checkLogin(this.props, () => {
      console.log('then');
    });
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
    const elements = [];
    
    elements.push(
      <div className={styles.btnContainer} key="container-0">
        <div className={styles.btn} onClick={this.voteHandler.bind(null, true)}>
          <Upvote />
          <span>{upvotes}</span>
        </div>

        <div className={styles.btn} onClick={this.voteHandler.bind(null, true)}>
          <Upvote className={styles.upsideDown} />
          <span>{downvotes}</span>
        </div>
      </div>
    );
    
    if(comments !== undefined){
      elements.push(
        <div className={styles.btnContainer} key="container-1">
          <div className={styles.btn} onClick={this.commentHandler}>
            <Comment />
            <span>{comments}</span>
          </div>
        </div>
      );
    }

    elements.push(
      <div className={styles.btnContainer} key="container-2">
        <div className={styles.btn} onClick={this.shareHandler}>
          <Share className={styles.share} />
          <span className={styles.optional}>Share</span>
        </div>
      </div>
    );
    
    if(comments !== undefined)
      return (
        <div className={styles.withComment}>
          {elements}
        </div>
      );
    
    return (
      <div className={styles.withoutComment}>
        {elements}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  ...state.auth, ...state.modals
});

const mapDispatchToProps = dispatch => ({
  ...loginDispatch(dispatch),
  openShare: postId => dispatch(openModal('SHARE', 'Share', {postId})),
});

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(VoteShareBar));