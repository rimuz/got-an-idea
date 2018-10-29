import React from 'react';
import { withRouter } from 'react-router';
import styles from './Button.module.scss';

const button = (props) => {
  var classes = [styles.button, props.className];

  if(props.invertedColors)
    classes.push(styles.inverted);

  var action = props.clicked;

  if(action === undefined){
    action = () => {
      props.history.push(props.to);
    };
  }

  return (
    <button className={classes.join(' ')} onClick={action}>
      {props.children}
    </button>
  );
};

export default withRouter(button);
