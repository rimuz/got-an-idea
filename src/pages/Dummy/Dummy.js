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
import Boiler from '../../components/Boiler/Boiler';
import styles from './Dummy.module.scss';

const dummy = () => {
  return (
    <Boiler>
      <div className={styles.page}>
        <div className={styles.container} >
          <div className={styles.emoji}>
            <span role='img' aria-label='warning'>⚠️</span>
          </div>
          
          <div>
            <h2>Working in progress</h2>
            <p>This page is under construction.</p>
          </div>
        </div>
      </div>
    </Boiler>
  );
};

export default dummy;