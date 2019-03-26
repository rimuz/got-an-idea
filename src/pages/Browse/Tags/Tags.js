import React from 'react';
import styles from './Tags.module.scss';

const tags = props => {
  const { tags } = props;
  var arr = tags.split(' ');

  if(arr[0].length === 0)
    arr = arr.splice(1);

    return (
    <div className={styles.container}>
        {
        arr.map(tag => (
          <span className={styles.tag} key={tag}>
            {tag}
          </span>
        ))
      }
    </div>
  );
}

export default tags;