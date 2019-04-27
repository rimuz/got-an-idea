/*
 *  Copyright 2019 Riccardo Musso
 *
 *  Licensed under the Apache License, Version 2.0 (the "License");
 *  you may not use this file except in compliance with the License.
 *  You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 *  Unless required by applicable law or agreed to in writing, software
 *  distributed under the License is distributed on an "AS IS" BASIS,
 *  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *  See the License for the specific language governing permissions and
 *  limitations under the License.
 *
*/

import React, { Component } from 'react';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';
import axios from 'axios';

import { openModal } from '../../../redux/actions';
import Loading from '../../../components/Loading/Loading';
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
    return (
      <Boiler>
        {this.state.done ?
          <div className={styles.outer}>
            <button onClick={this.homeHandler}>Back to Home</button>
          </div>
        : <Loading/> }
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
    msg: 'Transaction failed. Please check your internet connection and try again in a few minutes.',
    style: 'error', right: { msg: 'Yes, Sir' }
  }))
});

export default connect(null, mapDispatchToProps)(withRouter(Verify));