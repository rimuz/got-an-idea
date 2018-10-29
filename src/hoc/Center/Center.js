import React from 'react';
import styles from './Center.module.scss';

const center = (props) => {
    const outerClasses = [ styles.outer ];

    if(props.horizontal || !props.vertical){
      outerClasses.push(styles.horizontal);
    }

    if(props.vertical){
      outerClasses.push(styles.vertical);
    }

    if(props.outer)
      outerClasses.push(props.outer);

    return (
      <div className={outerClasses.join(" ")}>
        <div className={props.inner}>
          {props.children}
        </div>
      </div>
    );
};

export default center;
