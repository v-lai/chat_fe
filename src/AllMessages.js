import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import socketIOClient from "socket.io-client";
import Message from './Message';
import './AllMessages.css';

// update BASE_URL as needed
const BASE_URL = 'http://localhost:3001';

export default class AllMessages extends Component {
  constructor(props) {
    super(props);
    this.state = {
      content: '',
      messages: example, // `example` - for FE only, [] for when connected to BE
    };

    axios.get(`${BASE_URL}`)
    .then(res => {
      this.setState({
        content: '',
        messages: res.data,
      });
    })
    .catch(err => console.log(err));

    const socket = socketIOClient(BASE_URL);
    socket.on("FromAPI", data => this.setState({ messages: data }));
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();
    if (this.refs.inputText.value !== '') {
      let id = 1;
      if (this.state.messages[this.state.messages.length - 1]) {
        id = this.state.messages[this.state.messages.length - 1].id + 1;
      }
      let info = {
        author: localStorage.getItem('name'),
        content: ReactDOM.findDOMNode(this.refs.inputText).value,
        timestamp: Date.now(),
        id: id,
      };
      axios.post(`${BASE_URL}`, info)
        .then(res => {
          this.setState({
            messages: this.state.messages.concat([info]),
          }, () => {
            ReactDOM.findDOMNode(this.refs.inputText).value = '';
          });
        })
        .catch(err => console.log(err));
      
      // for Front-End Only - to see your own message at the bottom
      this.setState({
        messages: this.state.messages.concat([info]),
      })
    }
  }

  componentDidUpdate() {
    this.scrollToBottom();
  }

  scrollToBottom() {
    ReactDOM.findDOMNode(this.refs.messages).scrollTop = ReactDOM.findDOMNode(this.refs.messages).scrollHeight;
  }

  render() {
    let allMessages = this.state.messages.map((val, idx) => {
      return (
        <Message content={val.content} author={val.author} time={val.timestamp} mId={val.id} key={'msg' + val.id} editDelete={val._id}/>
      )
    });

    return (
      <div>
        <div className="messages" ref="messages">
          {allMessages}
        </div>
        <div className="input">
          <form className="chatInput" onSubmit={this.handleSubmit}>
            <input className="inputText" ref="inputText" type="text" placeholder="Your message here." />
          </form>
        </div>
      </div>
    );
  }
}

const example = [
  {
    "id": 1,
    "author": "Jane",
    "timestamp": 1421953410956,
    "content": "Hello!"
  },
  {
    "id": 2,
    "author": "Sam",
    "timestamp": 1421953434028,
    "content": "How are you?",
    "last_edited": 1421953454124
  },
  {
    "id": 3,
    "author": "Jane",
    "timestamp": 1421953433276,
    "content": "I'm in SAT!"
  },
  {
    "id": 4,
    "author": "Jane",
    "timestamp": 1421953454129,
    "content": "Flight is delayed. :P San Antonio TSA was the friendliest I've ever encountered, though. And I have a hamburger, a beer, and decent wifi."
  },
  {
    "id": 5,
    "author": "Sam",
    "timestamp": 1421953475813,
    "content": "Not bad."
  },
  {
    "id": 6,
    "author": "alex",
    "timestamp": 1421953485810,
    "content": "do you still need a ride from the airport?"
  },
  {
    "id": 7,
    "author": "Jane",
    "timestamp": 1421953502796,
    "content": "@Alex: Yeah, likely will get my bags after BART stops running. They're saying the ETA is 11:40pm now. Is that too late for you?",
    "last_edited": 1421953556411
  },
  {
    "id": 8,
    "author": "Sam",
    "timestamp": 1421953569386,
    "content": "Liana says hi!"
  },
  {
    "id": 9,
    "author": "alex",
    "timestamp": 1421953569386,
    "content": "that's fine"
  },
  {
    "id": 10,
    "author": "Carly",
    "timestamp": 1421953591994,
    "content": "https://medium.com/the-nib/the-truth-about-the-internet-fb8864c92185 oh dear"
  },
  {
    "id": 11,
    "author": "alex",
    "timestamp": 1421953601859,
    "content": "i'm on like aleutian time these days :P",
    "last_edited": "1421953605859"
  },
  {
    "id": 12,
    "author": "Jane",
    "timestamp": 1421953638978,
    "content": "Hi Lili! How did your art show go? :D"
  },
  {
    "id": 13,
    "author": "Carly",
    "timestamp": 1421953496000,
    "content": "Wheeeeee."
  },
  {
    "id": 14,
    "author": "Sam",
    "timestamp": 1421953733618,
    "content": "@Carly: Pretty much."
  },
]; 