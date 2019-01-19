import React, { Component } from 'react';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';

import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import 'react-quill/dist/quill.bubble.css';
import debounce from 'lodash/debounce';

import { makePage } from '../New';
import styles from './WritePost.module.scss';
import { 
  newPageReset, newPageSetPostType, newPageSetPostStage,
  newPageAddTag, newPageRemoveTag, newPageSetTitle,
  newPageSetBody,
} from '../../../redux/actions';

import projectStages from '../SelectStage/projectStages';
import ideaStages from '../SelectStage/ideaStages';
import tags from '../SelectTags/tags';

const modules = {
  toolbar: [
    [{ size: ['small', false, 'large' ]}],

    ['bold', 'italic', 'underline', 'strike'],
    
    [
      { list: 'ordered' }, { list: 'bullet' },
      'blockquote', 'code-block',
    ],
    
    ['link', 'video']
  ],
};

class WritePost extends Component {
  constructor(props){
    super(props);
    this.bodyHandlerDebounced = debounce(this.bodyHandler, 3000);
  }

  previousHandler = () => {
    const { history, stage } = this.props;
    history.push(`/post/${stage-1}`);
  };

  publishHandler = () => {
    const { reset, history } = this.props;

    reset();
    history.push(`/post/${0}`);
  };

  postTypeHandler = event => {
    const { setType } = this.props;
    setType(event.target.value);
  };

  postStageHandler = event => {
    const { setStage } = this.props;
    setStage(event.target.value);
  };

  tagHandler = event => {
    const { addTag, removeTag, postTags } = this.props;
    const tag = event.target.name;

    if(postTags.indexOf(tag) === -1)
      addTag(tag);
    else
      removeTag(tag);
  };

  titleHandler = event => {
    const { setTitle } = this.props;
    setTitle(event.target.value);
  };

  bodyHandler = value => {
    const { setBody } = this.props;
    setBody({ text: value });
  };

  render(){
    const { postType, postStage, postTags, title, body } = this.props;
    const stages = postType === 'project' ? projectStages : ideaStages;

    return makePage(
      <div className={styles.upper}>
        <div className={styles.text}>
          New post
        </div>

        <div>
          <button onClick={this.previousHandler} className={styles.previous}>Previous</button>
          <button onClick={this.publishHandler} className={styles.publish}>Publish</button>
        </div>
      </div>,

      <div className={styles.lower}>
        <form>
          <div className={styles.selects}>
            <div className={styles.input}>
              <h2>
                Select type of post:
              </h2>

              <label>
                <input type="radio" value="idea"
                  checked={postType === 'idea'} onChange={this.postTypeHandler} />
                Idea
              </label>

              <label>
                <input type="radio" value="project"
                  checked={postType !== 'idea'} onChange={this.postTypeHandler} />
                Project
              </label>
            </div>

            <div className={styles.input}>
              <h2>
                {`Select stage of the ${postType}:`}
              </h2>
            
              <select name="stage" value={postStage} onChange={this.postStageHandler}>
                {
                  stages.map(stage => (
                    <option value={stage.shortName} key={stage.shortName}>{stage.shortName}</option>
                  ))
                }
              </select>
            </div>

            <div className={styles.input}>
              <h2>
                Select appropriate tags:
              </h2>
              
              <div className={styles.tags}>
                {
                  tags.map(tag => (
                    <label key={tag.name}>
                      <input type="checkbox" name={tag.name} onChange={this.tagHandler}
                        checked={postTags.indexOf(tag.name) !== -1} />
                      {`#${tag.name}`}
                    </label>
                  ))
                }
              </div>
            </div>
          </div>

          <div className={styles.areas}>
            <input type="text" name="title" placeholder="Enter title here"
                value={title} onChange={this.titleHandler} />

            <ReactQuill value={body.text} onChange={this.bodyHandlerDebounced} theme="snow"
                modules={modules} placeholder="Enter body here" />              
          </div>
        </form>

        <div className={styles.buttons}>
          <button onClick={this.previousHandler} className={styles.previous}>Previous</button>
          <button onClick={this.publishHandler} className={styles.publish}>Publish</button>
        </div>
      </div>
    );
  }
};

const mapStateToProps = state => state.newPage;
const mapDispatchToProps = dispatch => ({
  reset: () => dispatch(newPageReset()),
  
  setType: type => dispatch(newPageSetPostType(type)),
  setStage: stage => dispatch(newPageSetPostStage(stage)),
  setTitle: title => dispatch(newPageSetTitle(title)),
  setBody: body => dispatch(newPageSetBody(body)),

  addTag: tag => dispatch(newPageAddTag(tag)),
  removeTag: tag => dispatch(newPageRemoveTag(tag)),
});

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(WritePost));