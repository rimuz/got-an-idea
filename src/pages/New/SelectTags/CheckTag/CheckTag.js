import React, { Component } from 'react';
import { connect } from 'react-redux';

import { newPageAddTag, newPageRemoveTag } from '../../../../redux/actions';
import styles from './CheckTag.module.scss';

class CheckTag extends Component {
  clickHandler = () => {
    const { addTag, removeTag, tag, postTags } = this.props;
    const { name } = tag;
    
    if(postTags.indexOf(name) === -1)
      addTag(name)
    else
      removeTag(name);
  };

  render() {
    const { postTags, tag } = this.props;
    const { name, emoji } = tag;
    const checked = postTags.indexOf(name) !== -1;

    return (
      <div className={
        `${styles.tag} ${checked ? styles.checked : ''}`
      } name={name} onClick={this.clickHandler}>
        <h1>#{name}</h1>
        <div>
          <span role='img' aria-label={name}>{emoji}</span>
        </div>
      </div>
    );
  }
};

const mapStateToProps = state => state.newPage;
const mapDispatchToProps = dispatch => ({
  addTag: tag => dispatch(newPageAddTag(tag)),
  removeTag: tag => dispatch(newPageRemoveTag(tag))
});

export default connect(mapStateToProps, mapDispatchToProps)(CheckTag);
