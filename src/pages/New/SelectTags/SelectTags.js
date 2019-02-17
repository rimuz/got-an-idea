import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';

import styles from './SelectTags.module.scss';
import { newPageNext } from '../../../redux/actions';
import Boiler from '../../../components/Boiler/Boiler';
import CheckTag from './CheckTag/CheckTag';
import tags from './tags';

class SelectTags extends Component {
  previousHandler = () => {
    const { history, stage } = this.props;
    history.push(`/post/${stage - 1}`);
  };
  
  nextHandler = () => {
    const { next, history, stage } = this.props;

    next();
    history.push(`/post/${stage + 1}`);
  };

  render(){
    return (
      <Boiler>
        <div className={styles.page}>
          <div className={styles.upper}>
            <div className={styles.text}>
              Select appropriate tags:
            </div>

            <div className={styles.buttons}>
              <button onClick={this.previousHandler} className={styles.previous}>Previous</button>          
              <button onClick={this.nextHandler} className={styles.next}>Next</button>
            </div>
          </div>

          <div className={styles.outer}>
            <div className={styles.lower}>
              <div className={styles.container}> 
                {
                  tags.map(tag => <CheckTag tag={tag} key={tag.name} />)
                }
              </div>
              
              <div className={styles.last}>
                <button onClick={this.previousHandler} className={styles.previous}>Previous</button>
                <button onClick={this.nextHandler} className={styles.next}>Next</button>
              </div>
            </div>
          </div>
        </div>
      </Boiler>
    );
  }

}

const mapStateToProps = state => state.newPage;
const mapDispatchToProps = dispatch => ({
  next: () => dispatch(newPageNext())
});
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(SelectTags));