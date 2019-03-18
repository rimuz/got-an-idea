import React, { Component } from 'react';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';
import axios from 'axios';

import { openModal } from '../../../redux/actions';
import Boiler from '../../../components/Boiler/Boiler';
import styles from './Verify.module.scss';

class Verify extends Component {
  state = {
    done: false,
  }

  homeHandler = () => {
    this.props.history.push('/');
  }
  
  render(){
    const elem = this.state.done ? (
      <div className={styles.outer}>
        <button onClick={this.homeHandler}>Back to Home</button>
      </div>
    ) : null;

    return (
      <Boiler>
        {elem}
      </Boiler>
    );
  }
  
  componentDidMount(){
    const { openSuccess, openError, openConnectionError } = this.props;
    const { token } = this.props.match.params;
    
    axios.post('/user/verify', { token })
      .then(response => {
        openSuccess();

        this.setState({
          done: true
        });
      })
      .catch(error => {
        if(error.response){
          openError(error.response.data.msg);
        } else {
          openConnectionError();
        }

        this.setState({
          done: true
        });
      })
  }
};

const mapDispatchToProps = dispatch => ({
  openSuccess: () => dispatch(openModal('GENERIC', 'Success', {
    msg: 'Email successfully verified.',
    style: 'success', right: { msg: 'Awesome!' }
  })),

  openError: msg => dispatch(openModal('GENERIC', 'Error', {
    msg, style: 'error', right: { msg: 'Ok' }
  })),

  openConnectionError: () => dispatch(openModal('GENERIC', 'Terrible error', {
    msg: 'Transaction failed. Please check your internet connection and wait a few minutes.',
    style: 'error', right: { msg: 'Yes, Sir' }
  }))
});

export default connect(null, mapDispatchToProps)(withRouter(Verify));