import React, { Component } from 'react';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';

import { makePage } from '../New';
import styles from './SelectStage.module.scss';
import { newPageNext, newPageSetPostStage } from '../../../redux/actions';

import projectStages from './projectStages';
import ideaStages from './ideaStages';

class ProjectStage extends Component {
  previousHandler = () => {
    const { history, stage } = this.props;
    history.push(`/post/${stage - 1}`);
  };
  
  clickHandler = name => {
    const { stage, history, setStage, next } = this.props;
    
    setStage(name);
    next();
    history.push(`/post/${stage + 1}`);
  };

  render() {
    const { postType } = this.props;
    const stages = postType === 'project' ? projectStages : ideaStages;

    return makePage(
      <div className={styles.upper}>
        <div className={styles.text}>
          {`Select stage of the ${postType}:`}
        </div>

        <button onClick={this.previousHandler} className={styles.previous}>Previous</button>                  
      </div>,

      <div className={styles.lower}>
        <div className={styles.container}>
          {
            stages.map(stage => (
              <div className={styles.option} stage={stage.shortName}
                  onClick={this.clickHandler.bind(null, stage.shortName)} key={stage.shortName}>
                <h1>{stage.title}</h1>
                <h2>@{stage.shortName}</h2>
                <p>{stage.desc}</p>
              </div>
            ))
          }
        </div>
        
        <button onClick={this.previousHandler} className={styles.previous}>Previous</button>
      </div>
    );
  }
}

const mapStateToProps = state => state.newPage;
const mapDispatchToProps = dispatch => ({
  setStage: name => dispatch(newPageSetPostStage(name)),
  next: () => dispatch(newPageNext()),
});
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(ProjectStage));