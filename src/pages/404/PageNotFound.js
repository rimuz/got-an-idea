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
import Center from '../../components/Center/Center';
import Button from '../../components/Button/Button';
import styles from './PageNotFound.module.scss';

const pageNotFound = () => {
  return (
    <Center horizontal vertical inner={styles.content} outer={styles.container}
            minHeight='100vh'>
      <h1>Error 404</h1>
      <p>
        I'm sorry. We can't provide the requested page.
      </p>

      <Button to='/'>
        Back to Home
      </Button>
    </Center>
  );
};

export default pageNotFound;
