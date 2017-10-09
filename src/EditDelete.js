import React, { Component } from 'react';
import axios from 'axios';
// import EditMessageModal from './EditMessageModal';

const BASE_URL = 'http://localhost:3001';

export default class EditDelete extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false,
    };
    this.onDelete = this.onDelete.bind(this);
    this.toggleModal = this.toggleModal.bind(this);
  }

  toggleModal() {
    this.setState({
      isOpen: !this.state.isOpen,
    });
  }

  onDelete() {
    axios.delete(`${BASE_URL}/${this.props.editDelete}`)
      .then(res => {
        // console.log('deleted!');
      })
      .catch(err => console.log(err));
  }

  render() {
    let modal = null; // EditMessageModal not ready
    // let modal = this.state.isOpen
    //   ? <EditMessageModal show={this.state.isOpen} onClose={this.toggleModal} edit={this.props.editDelete} />
    //   : null;

    let editDeleteButtons = null;
    if (this.props.author === localStorage.getItem('name')) {
      editDeleteButtons = (
        <span className="emojis">
          {/* <button onClick={this.toggleModal}><span role="img" aria-label="edit">✏️</span></button> */}
          <button><span role="img" aria-label="edit">✏️</span></button> {/* button for show only right now */}
          <button onClick={this.onDelete}><span role="img" aria-label="delete">❌</span></button>
        </span>
      );
    }

    return (
      <span>
        {modal}
        {editDeleteButtons}
      </span>
    );
  }
}
