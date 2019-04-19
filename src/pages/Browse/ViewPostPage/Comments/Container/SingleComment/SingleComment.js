import React from 'react';
import Sugar from 'sugar';
import VoteShareBar from '../../../../VoteShareBar/VoteShareBar';
import { connect } from 'react-redux';

import ReactQuill from 'react-quill';
import Container from '../Container';
import { ReactComponent as UserImage } from '../../../../assets/user.svg';
import styles from './SingleComment.module.scss';
import { viewPostPageSetReplyingTo, openModal } from '../../../../../../redux/actions';

class SingleComment extends React.Component {
  expandHandler = () => {
    this.containerRef.current.toggleVisibility();
  };

  replyHandler = () => {
    const { setReplyTo, replyTo, areaRef,
      isLoggedIn, openLogin } = this.props;

    if (!isLoggedIn){
      openLogin();
    } else {
      setReplyTo(replyTo);
      areaRef.current.scrollIntoView({ block: 'center', behavior: 'smooth' });
    }
  };

  constructor(props){
    super(props);

    if(!this.props.isReply)
      this.containerRef = React.createRef();
  }
  
  render(){
    const {
      id, body, name, upvotes, downvotes,
      isReply, replies, color, vote, time,
      areaRef
    } = this.props;

    const date = Sugar.Date.create(time, { fromUTC: true });
    const dateString = Sugar.Date.relative(date);

    return (
      <div className={styles.outer}>
        <div>
          <div className={styles.upper}>
            <UserImage style={{ color }} />

            <div className={styles.nameDate}>
              <h1>{name}</h1>
              <p>{dateString}</p>
            </div>
          </div>

          <ReactQuill className={styles.body} readOnly={true} value={body} theme="bubble" />
        </div>

        <VoteShareBar upvotes={upvotes} downvotes={downvotes}
          postId={id} vote={vote} type={isReply ? 'r' : 'c'} noShare={true}
          comments={replies} commentHandler={this.expandHandler}
          replyHandler={this.replyHandler} />

        { isReply ? null :
          <div className={styles.subContainer}>
            <Container ref={this.containerRef} myId={id} areReplies={true} areaRef={areaRef} />
          </div> }
      </div>
    );
  }
}

const stateToProps = state => state.auth;

const dispatchToProps = dispatch => ({
  setReplyTo: id => dispatch(viewPostPageSetReplyingTo(id)),
  openLogin: () => dispatch(openModal('LOGIN', 'Log in'))
});

export default connect(stateToProps, dispatchToProps)(SingleComment);