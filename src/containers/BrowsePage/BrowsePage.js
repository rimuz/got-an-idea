import React from 'react';
import styles from './BrowsePage.module.scss';

import Boiler from '../../hoc/Boiler/Boiler';
import Repeat from '../../hoc/Repeat/Repeat';
import Post from './Post/Post';

const browsePage = () => {
  return (
    <Boiler>
      <div className={styles.outer}>
        <div className={styles.content}>
          <Repeat n='30'>
            <Post
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
            />
          </Repeat>
        </div>
      </div>
    </Boiler>
  );
};

export default browsePage;
