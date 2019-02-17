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
            /*this.state.posts.map(post => (
              <Post
                id={post.id}
                title={post.title}
                body={post.body}
                upvotes={post.upvotes}
                downvotes={post.downvotes}
                comments={post.comments}
              />
            ))*/
          }
          
          <Repeat n='30'>
            <Post
              id='fuffa123'
              title={`This is the title of the idea.
                This is the title of the idea.
                This is the title of the idea.
                This is the title of the idea.
                This is the title of the idea.
              `}

              body={`The body of the idea is here along
                with the description and its details. If this
                part is too long it should be trimmed. Text Text
                Text Text Text Text Text Text Text Text Text Text
                Text Text Text Text Text Text Text Text Text Text
                Text Text Text Text Text Text Text Text Text Text
                Text Text Text Text Text Text Text Text Text Text
                Text Text Text Text Text Text Text Text Text Text
                Text Text Text Text Text Text Text Text Text Text
                Text Text Text Text Text Text Text Text Text Text
                Text Text Text Text Text Text Text Text Text Text`}
              upvotes={10}
              downvotes={20}
              comments={33}
              building={420}
            />
          </Repeat>
        </div>
      </div>
    );
  }

  onComponentDidMount(){
    axiosInstance.get('/browse')
      .then(response => {
        console.log({response});
      })
      .catch(error => {
        console.log({error});
      });
  }
}

export default BrowsePage;
