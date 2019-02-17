import React, { Component } from 'react';
import { Redirect } from 'react-router'; 
import { connect } from 'react-redux';

import { newPageSetStage } from '../../redux/actions';
import styles from './New.module.scss';

import Boiler from '../../components/Boiler/Boiler';
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
    const { stage, maxStage } = this.props;
    const urlStage = parseInt(this.props.match.params.urlStage);
    
    if(Number.isNaN(urlStage) || urlStage === undefined){
      return <Redirect to={`/post/${stage}`} />
    } else if(urlStage > maxStage){
      return <Redirect to={`/post/${maxStage}`} />
    }


    switch(urlStage){
      case 0:
        return <SelectType />

      case 1:
        return <SelectTags />
      
      case 2:
        return <SelectStage />
      
      case 3:
        return <WritePost />
      
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