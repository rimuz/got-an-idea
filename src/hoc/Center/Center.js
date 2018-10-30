import React from 'react';
import styles from './Center.module.scss';

const center = (props) => {
    const outerClasses = [ styles.outer ];
    const style = {};

    if(props.horizontal || !props.vertical)
      outerClasses.push(styles.horizontal);
    if(props.vertical)
      outerClasses.push(styles.vertical);

    if(props.outer)
      outerClasses.push(props.outer);


    if(props.width)
      style.width = props.width;
    if(props.height)
      style.height = props.height;
    if(props.minWidth)
      style.minWidth = props.minWidth;
    if(props.minHeight)
      style.minHeight = props.minHeight;

    return (
      <div style={style} className={outerClasses.join(" ")}>
        <div className={props.inner}>
          {props.children}
        </div>
      </div>
    );
};

export default center;
