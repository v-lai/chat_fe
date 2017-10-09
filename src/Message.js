import React, { Component } from 'react';
import Timestamp from './Timestamp';
import MessageContent from './MessageContent';
import './Message.css';

export default class Message extends Component {
  render() {
    return (
      <div className="message" key={'message' + this.props.mId}>
        <span className="author">
          {this.props.author}
        </span>
        <span className="timestamp">
          <Timestamp time={this.props.time} />
        </span>
        <MessageContent author={this.props.author} content={this.props.content} mId={this.props.mId} key={`msgcon${this.props.mId}`} editDelete={this.props.editDelete}/>
      </div>
    );
  }
}
