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
import { Redirect } from 'react-router'; 
import { connect } from 'react-redux';

import { newPageSetStage } from '../../redux/actions';

import PleaseLogIn from '../../components/PleaseLogIn/PleaseLogIn';
import SelectType from './SelectType/SelectType';
import SelectTags from './SelectTags/SelectTags';
import SelectStage from './SelectStage/SelectStage';
import WritePost from './WritePost/WritePost';

class New extends Component {
  checkStage = () => {
    const { stage, setStage } = this.props;
    const urlStage = parseInt(this.props.match.params.urlStage);

    if(stage !== urlStage)
      setStage(urlStage);
  }

  render() {
    const { stage, maxStage, editing, newPostSetStage } = this.props;
    const urlStage = parseInt(this.props.match.params.urlStage);
    
    if(urlStage === undefined || Number.isNaN(urlStage)){
      return <Redirect to={`/post/${stage}`} />;
    } else if(urlStage > maxStage){
      return <Redirect to={`/post/${maxStage}`} />;
    }

    switch(urlStage){
      case 0:
        return  <PleaseLogIn>
                  <SelectType />
                </PleaseLogIn>;

      case 1:
        return  <PleaseLogIn>
                  <SelectTags />
                </PleaseLogIn>;
      
      case 2:
        return  <PleaseLogIn>
                  <SelectStage />
                </PleaseLogIn>;
      
      case 3:
        return  <PleaseLogIn>
                  <WritePost />
                </PleaseLogIn>;
      
      default:
        return null;  
      // return <Redirect to={`/post/${stage}`} />;
    }
  }

  componentDidMount(){
    this.checkStage();
  }

  componentDidUpdate(){
    this.checkStage();
  }
};

const mapStateToProps = state => state.newPage;
const mapDispatchToProps = dispatch => ({
  setStage: stage => dispatch(newPageSetStage(stage))
});

export default connect(mapStateToProps, mapDispatchToProps)(New);