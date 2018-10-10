import React from 'react';

import Comp from '../../../hoc/Comp/Comp';
import { BlueColor, TextFont } from '../../../Constants';
import './TellMore.css';

const tellMore = () => {
  const global = {
    fontFamily: TextFont,
  };

  return (
    <div class='TellMore' style={global}>
      <div class='First'>
        <h1>Why <em>Got an idea</em>?</h1>

        <span class='Text'>
          "<strong>Everybody</strong> has ideas. Ideas are highly,
          highly <strong>overvalued</strong>. Execution is all that
          matters." - Casey Neistat. <br />

          Quotes aside, it's quite common to come up with ideas while having
          a shower or walking the dogs. So, we can assume thousands
          of intuitions are <strong>wasted</strong> every day,
          while thousands of people are <strong>desperately</strong> looking
          for them. <br />

          What <em>Got an idea</em> does is offering a tidy ad-hoc website
          where you can find <strong>inspirational</strong> ideas for your
          ext project along with opinions
          and <strong>improvements</strong> written by the community. <br />

          Note that similar things alredy existed (e.g. subreddits such as
          r/SomebodyMakeThis or r/gameideas) but were inadequate to host all
          the ideas' information and their developments as well as
          eventual <strong>feedbacks</strong> from users.
        </span>

        <h1>What does <em>Got an idea</em> consist of?</h1>
      </div>
    </div>
  );
};

export default tellMore;
