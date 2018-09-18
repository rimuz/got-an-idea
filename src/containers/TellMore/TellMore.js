import React from 'react';

import Boiler from '../../hoc/Boiler/Boiler';
import Center from '../../hoc/Center/Center';
import Repeat from '../../hoc/Repeat/Repeat';
import { TextFont } from '../../Constants';
import Card from '../Card/Card';

const tellMore = () => {
  return (
    <Boiler>
      <Center horizontal>
        <Repeat n='20'>
          <Card>
            <div style={{
              width: '75vw',
              margin: '20px',
              fontFamily: TextFont
            }}>
              <h2>Title Title Title</h2>
              Text Text Text <br />
              Text Text Text <br />
              Text Text Text <br />
              Text Text Text <br />
              Text Text Text <br />
              Text Text Text <br />
            </div>
          </Card>
        </Repeat>
      </Center>
    </Boiler>
  );
};
export default tellMore;
