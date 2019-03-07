import React, { Component } from 'react';
import { connect } from 'react-redux';
import styles from './BrowsePage.module.scss';

import Post from './Post/Post';
import Loading from '../../../components/Loading/Loading.js';
import { axiosInstance } from '../../..';
import { openModal } from '../../../redux/actions';

const MIN_POSTS_PER_LOAD = 10;

class BrowsePage extends Component {
  state = {
    idx: 0,
    posts: [],
    
    stillLoading: true,
    hasReachedEnd: false,
    justLoaded: 0,
  };

  render(){
    return (
      <div className={styles.outer}>
        <div className={styles.content}>
          {
            this.state.posts.map(post => {
              return (
                <Post
                  color={`hsl(${post.hue}, ${post.light}%, ${post.saturation}%)`}
                  key={post.postid}
                  name={post.name}
                  time={post.time}
                  id={post.postid}
                  title={post.title}
                  strippedBody={post.strippedbody}
                  upvotes={post.upvotes}
                  downvotes={post.downvotes}
                  comments={post.comments}
                  building={420}
                />
              )
            })
          }

          {
            this.state.stillLoading ? <Loading /> :
              !this.state.hasReachedEnd ?
                <div className={styles.btnContainer}>
                  <button className={styles.showMore} onClick={this.fetchPosts}>
                    Show More
                  </button>
                </div>
              : null
          }
        </div>
      </div>
    );
  }

  updateState = ({posts, nextIndex, hasReachedEnd}) => {
    // shallow copy
    const arr = this.state.posts.slice();
    const oldLength = arr.length;

    for(const post of posts){
      // ignore duplicated posts
      if (!arr.find(p => p.postid === post.postid))
        arr.push(post); 
    }
    
    const justLoaded = this.state.justLoaded + arr.length - oldLength;
    
    this.setState({
      ...this.state,
      stillLoading: false,
      idx: nextIndex,
      posts: arr,
      hasReachedEnd,
      justLoaded
    }, () => {
      if (!hasReachedEnd && justLoaded < MIN_POSTS_PER_LOAD)
        this.fetchPosts();
    });
  };

  fetchPosts = () => {
    const { openConnectionErrorModal } = this.props;

    this.setState({
      stillLoading: true,
    })

    axiosInstance.post('/browse', {
      sortMethod: 'newest',
      idx: `${this.state.idx}`
    })
      .then(response => {
        console.log({response});
        this.updateState(response.data);
      })
      .catch(error => {
        console.error(error);

        this.setState({
          ...this.state,
          stillLoading: false,
          hasReachedEnd: true,
        })

        openConnectionErrorModal();
      });
  }

  componentDidMount(){
    this.fetchPosts();
  }
}

const dispatchToProps = dispatch => ({
  openConnectionErrorModal: () => dispatch(openModal('GENERIC', 'Terrible error', {
    msg: 'Cannot connect to the server. Please check your internet connection, wait a few minutes and then refresh the page.',
    style: 'error', right: { msg: 'Alright!' }
  }))
});

export default connect(null, dispatchToProps)(BrowsePage);
