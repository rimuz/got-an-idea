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

import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import 'react-quill/dist/quill.bubble.css';

import styles from './WritePost.module.scss';
import Boiler from '../../../components/Boiler/Boiler';
import Loading from '../../../components/Loading/Loading';
import { 
  newPageReset, newPageSetPostType, newPageSetPostStage,
  newPageAddTag, newPageRemoveTag, newPageSetTitle,
  newPageSetBody, newPageSetInspiredBy, openModal
} from '../../../redux/actions';

import projectStages from '../SelectStage/projectStages';
import ideaStages from '../SelectStage/ideaStages';
import tags from '../SelectTags/tags';
import axios from 'axios';

const modules = {
  toolbar: [
    [{ size: ['small', false, 'large' ]}],

    ['bold', 'italic', 'underline', 'strike'],
    
    [
      { list: 'ordered' }, { list: 'bullet' },
      'blockquote', 'code-block',
    ],
    
    ['link', /*'video'*/ ]
  ],
};

class WritePost extends Component {
  state = {
    loading: false,
  };

  constructor(props){
    super(props);
    this.ref = React.createRef();
  }

  previousHandler = () => {
    const { reset, history, stage, editing, openDiscardMessage } = this.props;
    
    if(editing){ 
      openDiscardMessage(reset);
    } else {
      history.push(`/post/${stage-1}`);
    } 
  };

  publishHandler = () => {
    const { reset, history, postType, postStage,
      postTags, title, inspiredBy, openSuccess,
      openInputError, openConnectionError, editing } = this.props;
      
    const editor = this.ref.current.getEditor();
    const delta = editor.getContents();

    if(title.replace(/\s/g, '').length < 4){
      openInputError("Title must contain at least 4 non-space characters.");
      return;
    }

    if(editor.getLength() <= 1){
      openInputError("Body cannot be empty.");
      return;
    }

    const prefixRegex = /(https?:\/\/)?(www\.)?got-an-idea\.com\/browse\/post\//;
    const uuid4Regex = /^[0-9A-F]{8}-[0-9A-F]{4}-4[0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}$/i;
    var inspiredByUuid = '';

    if(inspiredBy.length !== 0){
      const prefixMatch = inspiredBy.match(prefixRegex);
      var uuidMatch;

      if(!prefixMatch || !(uuidMatch = inspiredBy.substring(prefixMatch[0].length).match(uuid4Regex))){
        openInputError("Invalid \"inspired by\" post URL");
        return;
      }

      inspiredByUuid = uuidMatch[0]; 
    }

    const obj = {
      title,
      inspiredBy: inspiredByUuid,
      body: {ops: delta.ops},
      stage: postStage,
      type: postType,
      tags: postTags.join(" "),
      isEdit: editing ? true : false,
      postUuid: editing,
    };

    axios.post('/user/post', obj)
      .then(() => {
        reset();
        openSuccess();
        history.push(`/post/${0}`);
      })
      .catch(error => {
        if(error.response)
          openInputError(error.response.data.message);
        else
          openConnectionError();
      
        this.setState({
          ...this.state,
          loading: false,
        })
      });
    
    this.setState({
      ...this.state,
      loading: true,
    })
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

  inspiredByHandler = event => {
    const { setInspiredBy } = this.props;
    setInspiredBy(event.target.value);
  }

  titleHandler = event => {
    const { setTitle } = this.props;
    setTitle(event.target.value);
  };

  bodyHandler = value => {
    const { setBody } = this.props;
    console.log("HANDLER!!");
    console.log({value});
    
    setBody({ text: value});
  };

  render(){
    const { postType, postStage, postTags, title, body, inspiredBy, editing } = this.props;
    const stages = postType === 'project' ? projectStages : ideaStages;
    const { loading } = this.state;

    return (
      <Boiler>
        <div className={styles.page}>
          <div className={styles.upper}>
            <div className={styles.text}>
              { editing != null ? `Edit post #${editing.substring(editing.length - 6)}` : "New post" }
            </div>

            { loading ? <Loading /> :
              <div>
                <button onClick={this.previousHandler} className={styles.previous}>
                  { editing != null ? "Discard changes" : "Previous" }
                </button>
                <button onClick={this.publishHandler} className={styles.publish}>
                  { editing != null ? "Update" : "Publish" }
                </button>
              </div> }
          </div>

          <div className={styles.outer}>
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
                      { stages.map(stage => <option value={stage.shortName}
                            key={stage.shortName}>{stage.shortName}</option> ) }
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

                  <div className={styles.input}>
                    <h2>
                      Inspired by:
                    </h2>

                    <input name="inspiredBy" type="text" autoComplete="off"
                      placeholder="Please paste post URL here (Optional)" value={inspiredBy} 
                      onChange={this.inspiredByHandler} />
                  </div>

                  <div className={styles.input}>
                    <h2>
                      Content:
                    </h2>
                  
                    <input type="text" name="title" placeholder="Enter title here"
                        value={title} onChange={this.titleHandler} autoComplete="off" />

                    <ReactQuill ref={this.ref} value={body.text} onChange={this.bodyHandler}
                        theme="snow" modules={modules} placeholder="Enter body here" />              
                  </div>
                </div>
              </form>

              { loading ? <Loading /> :
                <div className={styles.buttons}>
                  <button onClick={this.previousHandler} className={styles.previous}>
                    {editing != null ? "Discard changes" : "Previous"}
                  </button>
                  <button onClick={this.publishHandler} className={styles.publish}>
                    {editing != null ? "Update" : "Publish"}
                  </button>
                </div> }
            </div>
          </div>
        </div>
      </Boiler>
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
  setInspiredBy: inspiredBy => dispatch(newPageSetInspiredBy(inspiredBy)),

  addTag: tag => dispatch(newPageAddTag(tag)),
  removeTag: tag => dispatch(newPageRemoveTag(tag)),

  openInputError: msg => dispatch(openModal('GENERIC', 'Error', {
    msg, style: 'error',
    right: { msg: 'Got it!' }
  })),

  openSuccess: () => dispatch(openModal('GENERIC', 'Success', {
    msg: 'Published',
    style: 'success', right: { msg: 'Awesome!' }
  })),

  openConnectionError: () => dispatch(openModal('GENERIC', 'Terrible error', {
    msg: 'Transaction failed. Please check your internet connection and try again in a few minutes.',
    style: 'error', right: { msg: 'Yes, Sir' }
  })),


  openDiscardMessage: (action) => dispatch(openModal('GENERIC', 'Confirm operation', {
    msg: 'Are you sure to discard the changes on the post?',
    style: 'error',
    left: { msg: 'Cancel' },
    right: { msg: 'Confirm', onClick: action }
  })),
});

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(WritePost));