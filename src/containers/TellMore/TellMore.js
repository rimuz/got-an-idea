import React from 'react';

import Boiler from '../../hoc/Boiler/Boiler';
import Center from '../../hoc/Center/Center';
import Repeat from '../../hoc/Repeat/Repeat';
import { TextFont } from '../../Constants';
import Card from '../../hoc/Card/Card';

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
              <h2>Un biplano immersivo etichetta cupido per
                celebrare un grembiule</h2>
              La digestione giocava al serbatoio nella torre del
              faro, poi suggerisce che i criceti debbano girare in
              tram.
            </div>
          </Card>
        </Repeat>
      </Center>
    </Boiler>
  );
};
export default tellMore;
