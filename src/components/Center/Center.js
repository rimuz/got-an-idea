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
