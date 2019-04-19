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