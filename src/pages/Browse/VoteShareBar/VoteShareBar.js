import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import axios from 'axios';

import { ReactComponent as Upvote } from '../assets/upvote.svg';
import { ReactComponent as Comment } from '../assets/comment.svg';
import { ReactComponent as Share } from '../assets/share.svg';
import { openModal } from '../../../redux/actions';
import styles from './VoteShareBar.module.scss';

const UPVOTE = 0, DOWNVOTE = 1;

class VoteShareBar extends Component {
  constructor(props){
    super(props);

    this.state = {
      vote: props.vote,
    }
  }
  
  voteHandler = isUpvote => {
    const { vote } = this.state;
    const { postId, isLoggedIn, openLogin } = this.props;

    if(!isLoggedIn){
      openLogin();
      return;
    }
    
    console.log("uuid: '" + postId + "'");
    var newVote = !isUpvote | 0; // bool -> int
    var queryVote = newVote === 0 ? '+1' : '-1';
    
    if(vote !== undefined && isUpvote === (vote === 0)){
      newVote = undefined;
      queryVote = '0';
    }
    
    this.setState({
      vote: newVote,
    });
    
    axios.post('/user/vote', {
      target: 'p',
      uuid: postId,
      value: queryVote,
    })
      .then(response => {
        console.log("Success!!");
        console.log({response});
      })
      .catch(error => {
        console.log({error});
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
    var { comments, upvotes, downvotes } = this.props;
    const upvoted = this.state.vote === UPVOTE,
          downvoted = this.state.vote === DOWNVOTE;
    
    if (upvoted)
      upvotes += 1;
    else if (downvoted)
      downvotes += 1;
    
    return (
      <div className={comments ? styles.withComment : styles.withoutComment}>

        <div className={styles.btnContainer}>
          <div className={styles.btn} onClick={this.voteHandler.bind(null, true)}>
            <Upvote className={upvoted ? styles.selected : ""}/>
            <span className={upvoted ? styles.selected : ""}>{upvotes}</span>
          </div>

          <div className={styles.btn} onClick={this.voteHandler.bind(null, false)}>
            <Upvote className={styles.upsideDown + " " + (downvoted ? styles.selected : "")} />
            <span className={downvoted ? styles.selected : ""}>{downvotes}</span>
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