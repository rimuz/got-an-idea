import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

import { setBlue } from '../../Constants'
import BigTitle from './BigTitle/BigTitle';
import Subtitle from './Subtitle/Subtitle';
import Button from './Button/Button';
import Comp from '../../hoc/Comp/Comp'
import Center from '../../hoc/Center/Center'

class StartPage extends Component {
  tellMeMoreHandler = () => {
    this.props.history.push({
      pathname: '/tell-more'
    });
  };

  render() {
    return (
      <div>
        <div style ={{
          width: '100%',
          height: '100%',
          display: 'block'
        }}>
          <Center vertical horizontal>
            <BigTitle />
            <Subtitle />

            <Center horizontal>
              <Button clicked={this.tellMeMoreHandler.bind(this)}>
                Tell me more
              </Button>

              <Button>Login</Button>
              <Button>Register</Button>
            </Center>
          </Center>
        </div>

        <div style={{
          position: 'absolute',
          top: '100%',
          left: '0',
        }}>
          Ciao
        </div>
      </div>

    );
  }
};

export default withRouter(StartPage);
