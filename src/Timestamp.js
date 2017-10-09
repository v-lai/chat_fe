import React, { Component } from 'react';

export default class Timestamp extends Component {
  render() {
    const date = new Date(this.props.time);
    const year = date.getFullYear().toString().slice(-2);
    const month = date.getMonth();
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
                    'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const day = date.getDate();
    const hours = date.getHours();
    let minutes = date.getMinutes();
    if (minutes < 10) {
      minutes = '0' + minutes.toString();
    }
    let seconds = date.getSeconds();
    if (seconds < 10) {
      seconds = '0' + seconds.toString();
    }

    return (
      <div>
        {months[month]} {day} '{year} {hours}:{minutes}:{seconds}
      </div>
    );
  }
}
