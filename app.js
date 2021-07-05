const express = require('express');
const cors = require('cors');
const connection = require('./db-config');

const app = express();
app.use(express.json());
app.use(express.urlencoded());
// TODO: configure cors
app.use(cors());

connection.connect((err) => {
  if (err) {
    console.error(`error connecting: ${err.stack}`);
  } else {
    console.log(`connected as id ' ${connection.threadId}`);
  }
});

// TODO: add your routes here

module.exports = app;
