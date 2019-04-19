import React from 'react';
import { connect } from 'react-redux';
import axios from 'axios';

import Loading from '../../../../../components/Loading/Loading';
import SingleComment from './SingleComment/SingleComment';
import styles from './Container.module.scss';

const MIN_COMMENTS_PER_LOAD = 10, UPVOTE = 0, DOWNVOTE = 1;
var isMounted = false;

class Container extends React.Component {
  state = {
    idx: 0,
    comments: [],

    stillLoading: false,
    hasReachedEnd: false,
    justLoaded: 0,
    visible: true,
  };
  
  componentDidMount() {
    const { areReplies } = this.props;
    isMounted = true;

    if(areReplies)
      this.collapse();
    else
      this.fetchPosts();
  }

  componentWillUnmount() {
    isMounted = false;
  }

  show = () =>{
    this.setState({
      ...this.state,
      visible: true,
    });
  }

  collapse = () => {
    this.setState({
      ...this.state,
      visible: false,
    })
  }
  
  toggleVisibility = () => {
    const { visible } = this.state;
    
    this.setState({
      ...this.state,
      visible: !visible,
    }, () => {
      if(!visible)
        this.fetchPosts();
    });
  }

  render(){
    const { areReplies, myId, areaRef } = this.props;
    const { stillLoading, comments, hasReachedEnd, visible } = this.state;

    return (
      <div className={styles.outer + " " + (visible ? "" : styles.invisible)}>
        {this.state.comments.map(comment => (
          <SingleComment key={comment.commentid}
              replyTo={areReplies ? myId : comment.commentid}
              body={comment.body} name={comment.name}
              color={`hsl(${comment.hue}, ${comment.saturation}%, ${comment.light}%)`}
              vote={comment.vote} time={comment.time}
              replies={areReplies ? undefined : comment.replies}
              upvotes={comment.vote === UPVOTE ? (comment.upvotes - 1) : comment.upvotes}
              downvotes={comment.vote === DOWNVOTE ? (comment.downvotes-1) : comment.downvotes}
              isReply={areReplies} id={comment.commentid} areaRef={areaRef}
              >
            {comment.body}
          </SingleComment>
        ))}

        { stillLoading ? <Loading /> :
            !hasReachedEnd && (!areReplies || comments.length !== 0) ?
              <div className={styles.btnContainer}>
                <button className={styles.showMore} onClick={this.fetchPosts}>
                  {areReplies ? "Show more replies" : "Show more comments" }
                </button>
              </div>
        : null }
      </div>
    );
  }

  updateState = (data) => {
    const { comments, nextIndex, hasReachedEnd } = data;

    // shallow copy
    const arr = this.state.comments.slice();
    const oldLength = arr.length;

    for (const comment of comments) {
      // ignore duplicated posts
      if (!arr.find(c => c.commentid === comment.commentid)) {
        comment.body = JSON.parse(comment.body);
        arr.push(comment);
      }
    }

    const justLoaded = this.state.justLoaded + arr.length - oldLength;

    this.setState({
      ...this.state,
      stillLoading: false,
      idx: nextIndex,
      comments: arr,
      hasReachedEnd,
      justLoaded
    }, () => {
      if (!hasReachedEnd && justLoaded < MIN_COMMENTS_PER_LOAD)
        this.fetchPosts();
    });
  };

  fetchPosts = () => {
    const { triedLoggingIn, postId, areReplies, myId} = this.props;

    this.setState({
      ...this.state,
      stillLoading: true,
    })

    if (!triedLoggingIn) {
      setTimeout(this.fetchPosts, 50);
      return;
    }

    axios.post('/user/fetch-comments', {
      postId: areReplies ? myId : postId,
      sortMethod: areReplies ? 'oldest' : 'score',
      isComment: areReplies,
      idx: `${this.state.idx}`
    })
      .then(response => {
        if (isMounted)
          this.updateState(response.data);
      })
      .catch(error => {
        console.error("Error while loading browse page!!");
        console.error({ error });

        if (isMounted) {
          this.setState({
            ...this.state,
            stillLoading: false,
            hasReachedEnd: true,
          })
        }
      });
  }
}

const stateToProps = state => state.auth;
export default connect(stateToProps, null, null, { forwardRef: true })(Container);