import React, { Component } from 'react';
import EditDelete from './EditDelete';

export default class MessageContent extends Component {
  render() {
    let arr = null;
    if (this.props.content !== null) { 
      // finding 'http'
      arr = this.props.content.split('http');
      for (let i = 0; i < arr.length; i++) {
        if (arr[i] === '') {
          arr[i + 1] = arr[i + 1].split(' ');
          let text = 'http' + arr[i + 1][0];
          arr[i] = <a href={text} key={text+this.props.mId} target="_blank">{text}</a>;
          arr[i + 1] = ' ' + arr[i + 1].slice(1).join(' ');
        }
      }

      // finding '@'
      for (let j = 0; j < arr.length; j++) {
        if (typeof arr[j] === 'string' && arr[j].includes('@')) {
          let re = /@\w+/g;
          const matches = arr[j].match(re);
          const rests = arr[j].split(re);
          let match = 0;
          let rest = 0;
          const combination = [];
          while (match < matches.length && rest < rests.length) {
            if (rests[rest] === '') {
              combination.push(matches[match]);
            } else {
              combination.push(rests[rest]);
              combination.push(matches[match]);
            }
            rest++;
            match++;
            if (match === matches.length) {
              combination.push(rests.slice(rest));
            }
            if (rest === rests.length) {
              combination.push(matches.slice(match));
            }
          }
          arr[j] = combination;
          for (let k = 0; k < arr[j].length; k++) {
            if (arr[j][k].includes('@')) {
              arr[j][k] = <span className="usernames"><a href={arr[j][k].toLowerCase()} key={arr[j][k]+this.props.mId} className="highlight">{arr[j][k]}</a>{arr[j][k + 1]}</span>;
              arr[j][k + 1] = '';
            }
          }
        }
      }
    }
    let classNames = "content";
    if (this.props.author === localStorage.getItem('name')) {
      classNames += " authorColor";
    }

    return (
      <div className={classNames} key={this.props.mId}>
        {arr}&nbsp;
        <EditDelete author={this.props.author} editDelete={this.props.editDelete} />
      </div>
    );
  }
}
