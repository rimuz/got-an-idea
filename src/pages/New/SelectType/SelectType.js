import React, { Component } from 'react';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';
import styles from './SelectType.module.scss';

import { newPageNext, newPageSetPostType, newPageResetStage } from '../../../redux/actions';
import { makePage } from '../New';
import Comp from '../../../components/Comp/Comp';

class SelectType extends Component {
  clickHandler = (type) => {
    const { setType, next, /* resetStage, postType, */ history, stage } = this.props;

    /* if(postType !== undefined && postType !== type)
      resetStage(); */
    setType(type);
    next();
    history.push(`/post/${stage + 1}`);
  };

  render() {
    return makePage(
      <div className={styles.text}>
        Select type of the post:
      </div>,

      <Comp>
        <div className={styles.idea} onClick={this.clickHandler.bind(null, "idea")}>
          <h2>Idea</h2>

          <p>
            You thought of a concept for a new product
            you want to be realized but you haven't started working on it yet.
            Ideas include proposals for videogames, websites, books, movies and so on..
          </p>

          <p>
            Your post can inspire other people who eventually can make it real.
          </p>
        </div>

        <div className={styles.project} onClick={this.clickHandler.bind(null, "project")}>
          <h2>Project</h2>

          <p>
            You are going to work or alredy working on a certain product, so you
            want to build a community around it and get some feedback.
          </p>

          <p>
            You also want to keep the interested ones up to date with your progress.
          </p>
        </div>
      </Comp>
    );
  }
}

const mapStateToProps = state => state.newPage;
const mapDispatchToProps = dispatch => ({
  setType: type => dispatch(newPageSetPostType(type)),
  resetStage: () => dispatch(newPageResetStage()),
  next: () => dispatch(newPageNext()),
});

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(SelectType));

