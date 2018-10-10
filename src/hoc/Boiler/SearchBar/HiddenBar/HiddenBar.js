import React, { Component } from 'react';

import TextField from '../TextField/TextField';
import Comp from '../../../Comp/Comp';
import SearchImage from '../search.png';
import Center from '../../../Center/Center';
import { BlueColor } from '../../../../Constants';

class HiddenBar extends Component {
  state = { isBarClosed: true };

  toggleBarHandler = () => {
    this.setState({ isBarClosed: !this.state.isBarClosed });
  };

  render(){
    const button = {
      width: '5vw',
      height: '5vw',

      visibility: 'visible',
      backgroundImage: SearchImage,
      backgroundColor: BlueColor,
    };

    var style = {
      opacity: 0,
      width: 0,
      height: '3vw',

      transition: '2s opacity width'
    };

    if(!this.state.isBarClosed){
      style = {
        ...style,

        opacity: 1,
        width: '5vw'
      };
    }

    return (
      <div>
        <div style={style}>
          <TextField />
        </div>
        <button style={button} onClick={this.toggleBarHandler}></button>
      </div>
    );
  }
};

export default HiddenBar;
