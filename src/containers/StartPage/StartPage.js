import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import Radium from 'radium';

import { BlueColor, TextFont } from '../../Constants';
import BigTitle from './BigTitle/BigTitle';
import Subtitle from './Subtitle/Subtitle';
import Button from './Button/Button';
import Comp from '../../hoc/Comp/Comp';
import Center from '../../hoc/Center/Center';
import Repeat from '../../hoc/Repeat/Repeat';
import TellMore from './TellMore/TellMore';

class StartPage extends Component {
  constructor(props){
    super(props);
    this.tellMoreRef = React.createRef();
  }

  tellMeMoreHandler = () => {
    this.tellMoreRef.current.scrollIntoView({ block: 'end',  behavior: 'smooth' });
  };

  render() {
    const style = {
      backgroundColor: BlueColor
    };

    const fadeIn = Radium.keyframes({
      '0%': {
        opacity: 0,
        transform: 'translateY(+1.5vw)',
      },

      '100%': {
        opacity: 1,
      }
    });

    const inner = {
      animation: 'x 1.5s ease-in-out',
      animationName: fadeIn,
    };

    const bottom = {
      position: 'absolute',
      top: '100%',
      width: '100%'
    };

    return (
      <Comp>
        <Center vertical horizontal style={style}>
          <div style={inner}>
            <BigTitle />
            <Subtitle />

            <Center horizontal>
              <Button clicked={this.tellMeMoreHandler.bind(this)}>
                Tell me more
              </Button>

              <Button>Login</Button>
              <Button>Register</Button>
            </Center>
          </div>
        </Center>

        <div style={bottom} ref={this.tellMoreRef}>
          <TellMore />
        </div>
      </Comp>
    );
  }
};

export default withRouter(Radium(StartPage));
