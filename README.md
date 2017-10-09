# React Chat Front End

This project was bootstrapped with [Create React App](https://github.com/facebookincubator/create-react-app).

React components and their respective stylesheets are located in the `/src` folder.

## Viewing the app for deployment
To get this frontend app up and running is to cd into this directory in your terminal window, then
run:

 `npm start` or `yarn start`
  
This will start a web server serving the contents of this directory on
your machine. You can then see index.html at localhost:3000.

# Features
* View previous messages, with the newest message nearest the box where new
  messages are entered (so, reverse chronological order if you have previous
  messages appearing below the chatbox, otherwise, chronological order).
* Write a message.
* Have the message you wrote appear with the other messages, with your message
  as the most recent.
* Uses localStorage to specify and store username
* Link detection

# Backend 
## Data needed to be stored
* id (number)
* author (string)
* timestamp (date)
* content (string)
* last_edited (date) (optional)

## Routes needed
* GET '/' for finding all messages
* GET '/:message_id' for finding a particular message
* POST '/' for adding a message
* PATCH '/:message_id' for editing a particular message
* DELETE '/:message_id' for deleting a particular message
