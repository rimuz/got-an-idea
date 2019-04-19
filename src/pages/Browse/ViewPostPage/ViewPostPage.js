import React, { Component } from 'react';
import ReactQuill from 'react-quill';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import Sugar from 'sugar';
import axios from 'axios';

import { ReactComponent as User } from '../assets/user.svg';
import { ReactComponent as Building } from '../assets/building.svg';
import { ReactComponent as Report } from '../assets/report.svg';

import VoteShareBar from '../VoteShareBar/VoteShareBar';
import Comments from './Comments/Comments';
import Loading from '../../../components/Loading/Loading';
import styles from './ViewPostPage.module.scss';
import { openModal, newPageReset, newPageSetStage,
  newPageSetEditing, newPageSetPostType, newPageAddTag,
  newPageSetPostStage, newPageSetInspiredBy,
  newPageSetTitle, newPageSetBody, newPageSetMaxStage } from '../../../redux/actions';

const UPVOTE = 0, DOWNVOTE = 1;
var isMounted = false;

class ViewPostPage extends Component {
  state = {
    post: {},
    loading: true,
  }

  constructor(props){
    super(props);
    this.quillRef = React.createRef();
  }

  componentDidMount() {
    isMounted = true;
    this.fetchPost();
  }

  componentWillUnmount() {
    isMounted = false;
  }

  editHandler = () => {
    const { setData, history } = this.props;
    const { postId } = this.props.match.params;

    setData(this.state.post, postId);
    history.push('/post/3');
  };

  render(){
    const { openReport, userData } = this.props;
    const { postId } = this.props.match.params;
    const { hue, light, saturation, name, title, body,
      time, inspiredposts, vote, upvotes, downvotes,
      inspiredby, comments, type, stage } = this.state.post;
    
    const color = `hsl(${hue}, ${saturation}%, ${light}%)`;
    const date = Sugar.Date.create(time, { fromUTC: true });
    const dateString = Sugar.Date.relative(date);

    var inspiredByURL, shortInspiredBy;
    if(inspiredby != null){
      inspiredByURL = `https://got-an-idea.com/browse/post/${inspiredby}`;
      shortInspiredBy = inspiredby.substring(inspiredby.length - 6);
    }

    return (
      this.state.loading ? <Loading /> :
      <div className={styles.page}>
          <div className={styles.innerPage}>
            <div className={styles.top}>
              <div className={styles.userBar}>
                <div className={styles.user}>
                  <User style={{ color }}/>
                  <div className={styles.nameKarma}>
                    <div>{name}</div>
                    <div>{type} @{stage}</div>
                  </div>
                </div>

                <div className={styles.leftButtons}>
                  { userData.name === name ? 
                    <div className={styles.button} onClick={this.editHandler}>Edit</div> :
                    <Report className={styles.button} onClick={openReport.bind(null, { target: 'p', uuid: postId })}/>
                  }
                </div>
              </div>

              <div className={styles.posted}>
                Posted <strong>{dateString}</strong>
              </div>

              <h1 className={styles.title}>
                {title}
              </h1>

              <ReactQuill readOnly={true} value={body} theme="bubble" ref={this.quillRef} />

              { inspiredby == null ? null :
              <div className={styles.realizing}>
                <div>
                  This post has been inspired by <a href={inspiredByURL}>{shortInspiredBy}</a>
                  <br />
                </div>
              </div> }
              
              <div className={styles.realizing}>
                <Building />
                <div>
                  <strong>{inspiredposts}</strong> 
                    {inspiredposts === 1 ? " post has " : " posts have "}
                    been inspired by this <br />
                </div>
              </div>

              <VoteShareBar postId={postId} vote={vote}
                upvotes={vote === UPVOTE ? (upvotes-1) : upvotes}
                downvotes={vote === DOWNVOTE ? (downvotes-1) : downvotes}/>
            </div>

            <div className={styles.comments}>
              <Comments postId={postId} comments={comments} />
            </div>
          </div>
      </div>
    );
  }

  fetchPost = () => {
    const { openConnectionErrorModal, triedLoggingIn } = this.props;
    const { postId } = this.props.match.params;

    if (!triedLoggingIn){
      setTimeout(this.fetchPost, 50);
      return;
    }

    this.setState({
      ...this.state,
      loading: true,
      post: {},
    });

    axios.post('/browse/post/fetch', { uuid: postId })
      .then(response => {
        if (isMounted){
          var post = response.data.post;
          post.body = JSON.parse(post.body);

          this.setState({
            ...this.state,
            loading: false, post,
          });
        }
      })
      .catch(error => {
        console.error("Error while loading post comments!!");
        console.error({ error });

        if (isMounted) {
          this.setState({
            ...this.state,
            loading: true,
            hasReachedEnd: true,
          })

          openConnectionErrorModal();
          setTimeout(this.fetchPost, 1000);
        }
      });
  }
}

const stateToProps = state => state.auth;

const dispatchToProps = dispatch => ({
  openReport: args => dispatch(openModal('REPORT', 'Report post', args)),

  openConnectionErrorModal: () => dispatch(openModal('GENERIC', 'Terrible error', {
    msg: 'Cannot connect to the server. Please check your internet connection, try again in a few minutes and then refresh the page.',
    style: 'error', right: { msg: 'Alright!' }
  })),

  setData: (post, postId, content) => {
    dispatch(newPageReset());
    dispatch(newPageSetMaxStage(3));
    dispatch(newPageSetEditing(postId));
    
    for(const tag of post.tags.split(" ")){
      if(tag !== "")
        dispatch(newPageAddTag(tag));
    }
    
    dispatch(newPageSetPostType(post.type));
    dispatch(newPageSetPostStage(post.stage));
    dispatch(newPageSetInspiredBy(post.inspiredby || ""));
    dispatch(newPageSetTitle(post.title));
    dispatch(newPageSetBody({ text: post.body }));
  }
});

export default withRouter(connect(stateToProps, dispatchToProps)(ViewPostPage));