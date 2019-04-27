/*
 *  Copyright 2019 Riccardo Musso
 *
 *  Licensed under the Apache License, Version 2.0 (the "License");
 *  you may not use this file except in compliance with the License.
 *  You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 *  Unless required by applicable law or agreed to in writing, software
 *  distributed under the License is distributed on an "AS IS" BASIS,
 *  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *  See the License for the specific language governing permissions and
 *  limitations under the License.
 *
*/

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
