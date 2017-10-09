import React, { Component } from 'react';
import close from './images/icon-x-gray.svg';
import './Modal.css';

export default class Modal extends Component {
  constructor(props) {
    super(props);
    this.value = 'user' + Math.floor(Math.random() * 1000);
    if (!localStorage.getItem('name')) {
      localStorage.setItem('name', this.value);
    }
    this.state = {
      name: localStorage.getItem('name') || this.value,
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(e) {
    this.setState({
      name: e.target.value
    });
  }

  handleSubmit(e) {
    e.preventDefault();
    if (this.state.name !== '') {
      this.handleChange(e);
      localStorage.setItem('name', this.state.name);
    }
    this.props.onClose();
  }

  render() {
    return (
      <div className="overlay">
        <div className="modal">
          <div className="heading">
            <span className="close"><img onClick={this.props.onClose} src={close} alt="Close Modal" /></span>
            Enter/Change Username
          </div>
          <p></p>
          <form onSubmit={this.handleSubmit}>
            <div className="form-group">
              <label htmlFor="name">Username: </label>
              <input className="userText" type="text" name="name" value={this.state.name} onChange={this.handleChange} />
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
