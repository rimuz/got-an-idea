import React, { Component } from 'react';
import { connect } from 'react-redux';

import { closeModal, openModal } from '../../../redux/actions';
import styles from './Report.module.scss';
import axios from 'axios';

class Report extends Component {
  state = {
    selected: 'spam',
    details: '',
  }

  submitHandler = () => {
    const { openSuccess, openConnectionError, args } = this.props;

    axios.post('/report', {
      target: args.target,
      uuid: args.uuid,
      reason: this.state.selected,
      details: this.state.details
    })
      .then(openSuccess)
      .catch(error => {
        openConnectionError();
      });
  }

  changeHandler = event => {
    this.setState({
      ...this.state,
      selected: event.target.value
    });
  }

  detailsChange = event => {
    this.setState({
      ...this.state,
      details: event.target.value,
    });
  }

  render() {
    const { args, closeModal } = this.props;
    const { selected } = this.state;
    const what =  args.target === 'p' ? 'post' :
                  args.target === 'c' ? 'comment' : 'reply';

    return (
      <div className={styles.outer}>
        <p>
          You are about to report this {what}. <br /> Please specify the reason:
        </p>

        <div className={styles.options}>
          <div>
            <label>
              <input type="radio" value="spam" onChange={this.changeHandler}
                checked={selected === 'spam'} />
              It's spam.
            </label>
          </div>

          <div>
            <label>
              <input type="radio" value="abuse" onChange={this.changeHandler}
                checked={selected === 'abuse'} />
              It's abuse or harassing.
            </label>
          </div>

          <div>
            <label>
              <input type="radio" value="copyright" onChange={this.changeHandler}
                checked={selected === 'copyright'} />
              It infringes my copyright/trademark rights (Please give more information).
            </label>
          </div>

          <div>
            <label>
              <input type="radio" value="minors" onChange={this.changeHandler}
                checked={selected === 'minors'} />
              It's sexual or suggestive content involving minors.
            </label>
          </div>

          <div>
            <label>
              <input type="radio" value="porn" onChange={this.changeHandler}
                checked={selected === 'porn'} />
              It's pornography.
            </label>
          </div>

          <div>
            <label>
              <input type="radio" value="threat" onChange={this.changeHandler}
                checked={selected === 'threat'} />
              It's threatening self-harm or suicide.
            </label>
          </div>

          <div>
            <label>
              <input type="radio" value="other" onChange={this.changeHandler}
                checked={selected === 'other'} />
              Other reason (Please specify)
            </label>
          </div>
        </div>

        <textarea placeholder="Give more details here (optional)" maxLength="255"
            ref={this.areaRef} value={this.state.details} onChange={this.detailsChange} />

        <div className={styles.buttons}>
          <button className={styles.cancel} onClick={closeModal}>Cancel</button>
          <button className={styles.submit} onClick={this.submitHandler}>Submit</button>
        </div>
      </div>
    );
  }
};

const mapStateToProps = state => state.modals;

const mapDispatchToProps = dispatch => ({
  closeModal: () => dispatch(closeModal()),

  openSuccess: () => dispatch(openModal('GENERIC', 'Success', {
    msg: 'Thank you for you feedback!',
    style: 'success', right: { msg: 'Close' }
  })),

  openConnectionError: () => dispatch(openModal('GENERIC', 'Terrible error', {
    msg: 'Operation failed. Please check your internet connection and try again in a few minutes.',
    style: 'error', right: { msg: 'Okay' }
  }))
});

export default connect(mapStateToProps, mapDispatchToProps)(Report);