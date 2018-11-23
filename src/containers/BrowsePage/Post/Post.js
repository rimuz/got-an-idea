import React from 'react';
import { Link } from 'react-router-dom';

import styles from './Post.module.scss';
import { ReactComponent as User } from './user.svg';
import { ReactComponent as Upvote} from './upvote.svg';
import { ReactComponent as Comment } from './comment.svg';
import { ReactComponent as Building } from './building.svg';
import { ReactComponent as Share } from './share.svg';

const post = (props) => {
  return (
    <div className={styles.outer}>
      <div className={styles.upper}>
        <User />

        <div className={styles.nameDate}>
          <h1>Nome Dell'Utente buffo</h1>
          <p>10h</p>
        </div>
      </div>

      <h1>{props.title}</h1>
      <div className={styles.body}>
        {props.body}
      </div>

      <div className={styles.lower}>
        <div className={styles.btnContainer}>
          <div className={styles.btn}>
            <Upvote />
            <span>256</span>
          </div>
          
          <div className={styles.btn}>
            <Upvote className={styles.upsideDown} />
            <span>24</span>  
          </div>
        </div>

        <div className={styles.btnContainer}>
          <div className={styles.btn}>
            <Comment />
            <span>12</span>
          </div>

          <div className={styles.btn}>
            <Building />
            <span>45</span>
          </div>
        </div>
        
        <div className={styles.btnContainer}>
          <div className={styles.btn}>
            <Share className={styles.share}/>
            <span className={styles.aoptional}>Share</span>
          </div>
        </div>

      </div>
    </div>
  );
};

export default post;