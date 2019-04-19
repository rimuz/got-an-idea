import React from 'react';
import styles from './Comments.module.scss';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';

import axios from 'axios';
import 'react-quill/dist/quill.bubble.css';
import ReactQuill from 'react-quill';

import Container from './Container/Container';
import Comp from '../../../../components/Comp/Comp';
import { openModal, viewPostPageReset, viewPostPageSetBody } from '../../../../redux/actions';

const modules = {
  toolbar: [
      ['bold', 'italic', 'underline' ],
      [ 'blockquote', 'code-block', { 'list': 'bullet' }, { 'list': 'ordered'}],
  ]
};

class Comments extends React.Component {  
  constructor(props){
    super(props);
    this.ref = React.createRef();
    this.areaRef = React.createRef();
  }

  onChangeHandler = value => {
    const { setCommentBody, postId } = this.props;
    setCommentBody({ text: value }, postId);
  };

  loginHandler = () => {
    const { openLogin } = this.props;
    openLogin();
  };

  signupHandler = () => {
    const { history } = this.props;
    history.push('/user/sign-up');
  };

  discardHandler = () => {
    const { openDiscardMessage, resetComment, postId } = this.props;
    const editor = this.ref.current.getEditor();

    if(editor.getLength() > 1)
      openDiscardMessage(() => resetComment(postId));
    else
      resetComment(postId);
  };

  submitHandler = () => {
    const { history, postId, openInputError,
      openConnectionError, resetComment, replyingTo } = this.props;

    const editor = this.ref.current.getEditor();
    const delta = editor.getContents();

    if(editor.getLength() <= 1) {
      openInputError("Comment body cannot be empty.");
      return;
    }

    const obj = {
      body: { ops: delta.ops },
      postId: replyingTo || postId, 
      isReply: replyingTo ? true : false,
    };

    axios.post('/user/comment', obj)
    .then(() => {
      history.go(0);
    })
    .catch(error => {
      if (error.response)
      openInputError(error.response.data.message);
      else
      openConnectionError();
    });

    resetComment(postId);
  };

  render() {
    const { isLoggedIn, postId, resetComment, replyingTo,
      commentTo, comments, commentBody } = this.props;

    if (postId !== commentTo) {
      resetComment(postId);
    }

    return (
      <div>
        { isLoggedIn ?
        // if logged in, comment component
        <Comp>
          <div className={styles.area}>
            {replyingTo ?
              <div className={styles.replyTo}>
                Replying to comment #{replyingTo.substring(replyingTo.length-6)}
              </div> : null}
            
            <div ref={this.areaRef}>
              <ReactQuill theme="bubble" modules={modules} placeholder="Type something!"
                  value={commentBody.text} onChange={this.onChangeHandler} ref={this.ref}/>
            </div>
          </div>

          <div className={styles.buttons}>
            <div className={styles.innerButtons}>
              <button className={styles.discard} onClick={this.discardHandler}>
                Discard
              </button>

              <button className={styles.submit} onClick={this.submitHandler}>
                Submit
              </button>
            </div>
          </div>
        </Comp> : 
        
        // if not logged in, please do
        <div className={styles.logInContent}>
          <p className={styles.notLogged}>
            If you would like to comment, please log in first 
          </p>

          <div className={styles.logInButtons}>
            <button className={styles.login} onClick={this.loginHandler}>
              Log In
            </button>

            <button className={styles.signup} onClick={this.signupHandler}>
              Sign Up
            </button>
          </div>
        </div> }

        <div className={styles.numComments}>
          <strong>{comments}</strong> Comments
        </div>

        <Container postId={postId} areReplies={false} areaRef={this.areaRef} />
      </div>
    );
  }
}

const stateToProps = state => ({
  ...state.auth, ...state.viewPostPage,
});

const dispatchToProps = dispatch => ({
  openSuccess: () => dispatch(openModal('GENERIC', 'Success', {
    msg: 'Published',
    style: 'success', right: { msg: 'Awesome!' }
  })),

  openConnectionError: () => dispatch(openModal('GENERIC', 'Terrible error', {
    msg: 'Transaction failed. Please check your internet connection and try again in a few minutes.',
    style: 'error', right: { msg: 'Yes, Sir' }
  })),

  openInputError: msg => dispatch(openModal('GENERIC', 'Error', {
    msg, style: 'error',
    right: { msg: 'Got it!' }
  })),

  openDiscardMessage: (action) => dispatch(openModal('GENERIC', 'Confirm operation', {
    msg: 'Are you sure to discard the content of the comment?',
    style: 'error', 
    left: { msg: 'Cancel' }, 
    right: { msg: 'Confirm', onClick: action }
  })),

  openLogin: () => dispatch(openModal('LOGIN', 'Log in', { then: () => { } })),
  resetComment: postId => dispatch(viewPostPageReset(postId)),
  setCommentBody: (body, postId) => dispatch(viewPostPageSetBody(body, postId))
});

export default connect(stateToProps, dispatchToProps)(withRouter(Comments));