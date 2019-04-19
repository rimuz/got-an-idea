import React, { Component } from 'react';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';
import axios from 'axios';

import { openModal } from '../../../redux/actions';
import Loading from '../../../components/Loading/Loading';
import Boiler from '../../../components/Boiler/Boiler';
import styles from './Reset.module.scss';

class Reset extends Component {
  state = {
    done: false,
  }

  homeHandler = () => {
    this.props.history.push('/');
  }
  
  render(){
    return (
      <Boiler>
        {this.state.done ?
          <div className={styles.outer}>
            <button onClick={this.homeHandler}>Back to Home</button>
          </div>
        : <Loading /> }
      </Boiler>
    );
  }
  
  componentDidMount(){
    const { openSuccess, openError, openConnectionError } = this.props;
    const { token } = this.props.match.params;
    
    axios.post('/user/recover/execute', { token })
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
    msg: 'Success! We sent you an email with the new password!',
    style: 'success', right: { msg: 'Awesome!' }
  })),

  openError: msg => dispatch(openModal('GENERIC', 'Error', {
    msg, style: 'error', right: { msg: 'Ok' }
  })),

  openConnectionError: () => dispatch(openModal('GENERIC', 'Terrible error', {
    msg: 'Transaction failed. Please check your internet connection and try again in a few minutes.',
    style: 'error', right: { msg: 'Yes, Sir' }
  }))
});

export default connect(null, mapDispatchToProps)(withRouter(Reset));