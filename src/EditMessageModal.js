// this modal is not ready yet

import React, { Component } from 'react';
import axios from 'axios';
import close from './images/icon-x-gray.svg';
import './Modal.css';

const BASE_URL = 'http://localhost:3001';

export default class EditMessageModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      content: '',
    }

    axios.get(`${BASE_URL}/${this.props.edit}`)
      .then(res => {
        this.setState({
          content: res.data.content,
        });
      })
      .catch(err => console.log(err));

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(e) {
    this.setState({
      content: e.target.value
    });
  }

  handleSubmit(e) {
    e.preventDefault();
    this.handleChange(e);
    axios.patch(`${BASE_URL}/${this.props.edit}`, { 'content': e.target.value })
      .then(res => {
        this.setState({
          content: '',
        });
        console.log('edited!');
      })
      .catch(err => console.log(err));
    this.props.onClose();
  }

  render() {
    return (
      <div className="overlay">
        <div className="modal">
          <div className="heading">
            <span className="close"><img onClick={this.props.onClose} src={close} alt="Close Modal" /></span>
            Edit Message
          </div>
          <p></p>
          <form onSubmit={this.handleSubmit}>
            <div className="form-group">
              <label htmlFor="content">Message: </label>
              <input className="messageText" type="text" name="content" value={this.state.content} onChange={this.handleChange} />
            </div>

            <div className="button-wrap">
              <input type='submit' className="save" value="Save" />
              <button className="cancel" onClick={this.props.onClose}>Cancel</button>
            </div>
          </form>
        </div>
      </div>
    )
  };
}
