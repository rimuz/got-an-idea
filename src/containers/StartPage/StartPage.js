import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import Radium from 'radium';

import { BlueColor, TextFont } from '../../Constants';
import BigTitle from './BigTitle/BigTitle';
import Subtitle from './Subtitle/Subtitle';
import Button from '../../components/Button/Button';
import Comp from '../../hoc/Comp/Comp';
import Center from '../../hoc/Center/Center';
import Repeat from '../../hoc/Repeat/Repeat';
import TellMore from './TellMore/TellMore';
import Footer from '../../components/Footer/Footer';

class StartPage extends Component {
  constructor(props){
    super(props);
    this.tellMoreRef = React.createRef();
  }

  tellMeMoreHandler = () => {
    this.tellMoreRef.current.scrollIntoView({ block: 'start',  behavior: 'smooth' });
  };

  render() {
    const style = {
      backgroundColor: BlueColor
    };

    const buttons = {
      marginTop: '1em',
      marginRight: '0.75em',
      fontSize: '2vw',

      '@media (max-width: 800px)': {
        fontSize: '3vw',
      }
    }

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
              <Button clicked={this.tellMeMoreHandler.bind(this)}
                  style={buttons}>
                Tell me more
              </Button>

              <Button style={buttons}>Login</Button>
              <Button style={buttons}>Register</Button>
            </Center>
          </div>
        </Center>

        <div style={bottom} ref={this.tellMoreRef}>
          <TellMore />
          <Footer />
        </div>
      </Comp>
    );
  }
};

export default withRouter(Radium(StartPage));
