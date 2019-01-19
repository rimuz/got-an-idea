import React, { Component } from 'react';
import { connect } from 'react-redux';
import styles from './Share.module.scss';

import { prefix } from '../../../index';

class Share extends Component {
  constructor(props){
    super(props);
    this.urlText = React.createRef();
  }

  componentDidMount() {
    window.twttr.widgets.load();
  }

  copyHandler = () => {
    this.urlText.current.select();
    document.execCommand('copy');
  }
  
  render(){
    const { postId } = this.props.args;
    const url = prefix + '/browse/post/' + postId; 
    const uri = encodeURI(url);

    return (
      <div className={styles.content}>
        <div className={styles.urlParent}>
          <input ref={this.urlText} className={styles.url} type="text" value={url} readOnly />
          <button onClick={this.copyHandler} className={styles.copy}>
            <span role='img' aria-label='copy'>📋</span> Copy
          </button>  
        </div>

        <div className={styles.share}>
          {/* Facebook Like & Share */}
          <iframe className={styles.facebook} width="170" height="30"
            style={{border: 'none', overflow: 'hidden' }} scrolling="no"
            frameBorder="0" allowtransparency="true" allow="encrypted-media"
            title="Facebook Buttons" src={
              "https://www.facebook.com/plugins/like.php?href=" + uri +
              "&width=170&layout=button&action=like&size=large&show_faces=false" +
              "&share=true&height=65&appId"
            }
          />

          {/* Twitter */}
          <a href="https://twitter.com/share?ref_src=twsrc%5Etfw"
            className="twitter-share-button" data-size="large"
            data-url={url} data-dnt="true" data-show-count="false">
              Tweet
          </a>
          
        </div>
      </div>
    );
  }
};

const mapStateToProps = state => state.modals;
export default connect(mapStateToProps, null)(Share);