import React, { Component } from 'react';
import AllMessages from './AllMessages';
import Modal from './Modal';
import './App.css';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: true,
    };

    this.toggleModal = this.toggleModal.bind(this);
  }

  toggleModal() {
    this.setState({
      isOpen: !this.state.isOpen,
    });
  }

  render() {
    let modal = this.state.isOpen
      ? <Modal show={this.state.isOpen} onClose={this.toggleModal} />
      : null;

    return (
      <div>
        {modal}
        <div className="app" key="app">
          <div>
            <h1>
              tinychat <span role="img" aria-label="chat emojis">👩🏿‍💻💬👨🏽‍💻</span>
              <button className="user" onClick={this.toggleModal}>Change Username</button>
            </h1>
          </div>
          <AllMessages />
        </div>
      </div>
    );
  }
}
