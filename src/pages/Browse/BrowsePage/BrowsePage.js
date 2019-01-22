import React, { Component } from 'react';
import styles from './BrowsePage.module.scss';

import Repeat from '../../../components/Repeat/Repeat';
import Post from './Post/Post';
import { axiosInstance } from '../../..';

class BrowsePage extends Component {
  state = {
    posts: [],
  };

  render(){
    return (
      <div className={styles.outer}>
        <div className={styles.content}>
          {
            this.state.posts.map(post => (
              <Post
                id={post.id}
                title={post.title}
                body={post.body}
                upvotes={post.upvotes}
                downvotes={post.downvotes}
                comments={post.comments}
              />
            ))
          }
        </div>
      </div>
    );
  }

  onComponentDidMount(){
    axiosInstance.get('/browse');
  }
}

export default BrowsePage;
