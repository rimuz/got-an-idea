import React from 'react';
import styles from './Comments.module.scss';

import 'react-quill/dist/quill.bubble.css';
import ReactQuill from 'react-quill';

const modules = {
  toolbar: [
      ['bold', 'italic', 'underline' ],
      [ 'blockquote', 'code-block', { 'list': 'bullet' }, { 'list': 'ordered'}],
  ]
};


const comments = () => (
  <div>
    <div className={styles.area}>
      <ReactQuill theme="bubble" modules={modules} placeholder="Type something!" />
    </div>

    <div className={styles.buttons}>
      <div className={styles.innerButtons}>
        <button className={styles.discard}>Discard</button>
        <button className={styles.submit}>Submit</button>
      </div>
    </div>

    <div className={styles.numComments}>
      <strong>0</strong> Comments
    </div>
  </div>
);

export default comments;