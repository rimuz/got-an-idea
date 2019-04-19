import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';

import { closeModal, openModal, setUserData } from '../../../redux/actions';
import Loading from '../../Loading/Loading';
import styles from './ColorChoose.module.scss';

class ColorChoose extends Component {
  state = {
    hue: '0',
    light: '50',
    sat: '50',
    loading: false,
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
    const { hue, sat, light } = this.state;
    const { openSuccess, openError, setColor } = this.props;
    const color = { hue, sat, light };

    axios.post('/user/change-color', color)
    .then(response => {
      setColor(color);
      openSuccess();
    })
    .catch(response => openError());
    
    this.setState({
      ...this.state,
      loading: true,
    });
  }

  componentDidMount(){
    const { hue, sat, light } = this.props.userData.color;
    this.setState({ hue, sat, light });
  }
  
  render(){
    const { hue, sat, light, loading } = this.state;

    return (
      <div className={styles.outer}>
        <div className={styles.upper}>
          <div className={styles.preview} style={{ color: `hsl(${hue}, ${sat}%, ${light}%)` }} />
          
          <h2>Hue</h2>
          <input name="hue" type="range" min="0" max="359" value={hue} onChange={this.changeHandler}/>
          
          <h2>Saturation</h2>
          <input name="sat" type="range" min="20" max="80" value={sat} onChange={this.changeHandler}/>

          <h2>Light</h2>
          <input name="light" type="range" min="20" max="80" value={light} onChange={this.changeHandler}/>
        </div>
      
        { loading ? <Loading /> :
          <div className={styles.buttons}>
            <button className={styles.cancel} onClick={this.cancelHandler}>Cancel</button>
            <button className={styles.apply} onClick={this.applyHandler}>Apply</button>
          </div> }
      </div>
    );
  }
}

const mapStateToProps = state => state.auth;
const mapDispatchToProps = dispatch => ({
  openSuccess: () => dispatch(openModal('GENERIC', 'Success', {
    msg: 'Color changed successfully.',
    style: 'success', right: { msg: 'Awesome!' }
  })),
  
  openError: () => dispatch(openModal('GENERIC', 'Terrible error', {
    msg: 'Operation failed. Please check your internet connection and try again in a few minutes.',
    style: 'error', right: { msg: 'Okay' }
  })),

  closeModal: () => dispatch(closeModal()),
  setColor: color => dispatch(setUserData({ color }))
});

export default connect(mapStateToProps, mapDispatchToProps)(ColorChoose);