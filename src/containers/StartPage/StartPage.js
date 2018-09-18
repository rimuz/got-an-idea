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
    );
  }
};

export default withRouter(StartPage);
