import React from 'react';
import styles from './BrowsePage.module.scss';

import Repeat from '../../../hoc/Repeat/Repeat';
import Post from './Post/Post';

const browsePage = () => (
  <div className={styles.outer}>
    <div className={styles.content}>
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
            Text Text Text Text Text Text Text Text Text Text`
          }

          upvotes={10}
          downvotes={20}
          comments={33}
          building={420}
        />
      </Repeat>
    </div>
  </div>
);

export default browsePage;
