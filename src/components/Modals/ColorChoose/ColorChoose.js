import React, { Component } from 'react';
import { connect } from 'react-redux';

import { closeModal, setUserData, updateColor } from '../../../redux/actions';
import styles from './ColorChoose.module.scss';

class ColorChoose extends Component {
  state = {
    hue: '0',
    light: '50',
    sat: '50',
  }

  changeHandler = (event) => {
    const { name, value } = event.target;
    
    this.setState({
      ...this.state,
      [name]: value,
    });
  }

  cancelHandler = () => {
    const { closeModal } = this.props;
    closeModal();
  }

  applyHandler = () => {
    const { updateColor } = this.props;
    
    updateColor({
      hue: this.state.hue,
      light: this.state.light,
      sat: this.state.sat,
    })
  }

  componentDidMount(){
    const { hue, light, sat } = this.props.userData.color;
    this.setState({ hue, light, sat });
  }
  
  render(){
    const { hue, light, sat } = this.state;

    return (
      <div className={styles.outer}>
        <div className={styles.upper}>
          <div className={styles.preview} style={{ color: `hsl(${hue}, ${light}%, ${sat}%)` }} />
          
          <h2>Hue</h2>
          <input name="hue" type="range" min="0" max="359" value={hue} onChange={this.changeHandler}/>
          
          <h2>Light</h2>
          <input name="light" type="range" min="20" max="80" value={light} onChange={this.changeHandler}/>

          <h2>Saturation</h2>
          <input name="sat" type="range" min="20" max="80" value={sat} onChange={this.changeHandler}/>
        </div>
      
        <div className={styles.buttons}>
          <button className={styles.cancel} onClick={this.cancelHandler}>Cancel</button>
          <button className={styles.apply} onClick={this.applyHandler}>Apply</button>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => state.auth;
const mapDispatchToProps = dispatch => ({
  closeModal: () => dispatch(closeModal()),
  updateColor: color => dispatch(updateColor(color))
});

export default connect(mapStateToProps, mapDispatchToProps)(ColorChoose);