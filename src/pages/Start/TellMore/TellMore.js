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
import styles from './TellMore.module.scss';

const tellMore = () => {
  return (
    <div className={styles.container}>
      <h1>Why <em>Got an idea</em>?</h1>

      <div>
        <p>
          As mathematician Alfred North Whitehead once said,
          &laquo;<strong>Ideas</strong> won't keep.
          Something <strong>must</strong> be done about them&raquo;.
        </p>

        <p>
          Quotes aside, it's quite common to come up with ideas while having
          a shower or walking the dogs. So, we can assume thousands
          of intuitions are <strong>wasted</strong> every day,
          while thousands of people are <strong>desperately</strong> looking
          for them.
        </p>

        <p>
          What <em>Got an idea</em> does is offering a tidy ad-hoc website
          where you can find <strong>inspirational</strong> ideas for your
          next project along with opinions
          and <strong>improvements</strong> submitted by the community.
        </p>

        <p>
          Unlike popular social media and blogs, <em>Got an idea</em> lacks
          of all the distractions you can find on them, and it's
          the best place to visit when you are having trouble
          finding <strong>inspiration</strong> for your next <em>big thing</em>.
        </p>
      </div>

      <h1>The spirit of <em>Got an idea</em></h1>

      <div>
        <p>
          When you <strong>share</strong> your intuition here, it automatically
          becomes of <em>public domain</em>, and several users
          can improve it and make it theirs. So, please don't publish the secret sauce
          of <em>Big Mac</em>, but rather tell us what's that apparently useless
          thing you'd really buy if it <strong>existed</strong>.
        </p>

        <p>
          So, what are you doing still here? Go share your <strong>thoughts</strong> and let other
          creative people like you <strong>judge</strong> them, or silently check out
          the <strong>concepts</strong> behind future unicorn startups (or also <em>steal</em> them, I won't tell anyone).
        </p>  
      </div>
    </div>
  );
};

export default tellMore;
