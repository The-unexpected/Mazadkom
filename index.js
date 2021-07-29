'use strict';
const express = require('express')
const app = express();

require('dotenv').config();
// const server = require('./src/server');
const mongoose = require('mongoose');
const PORT = process.env.PORT || 5001;
const MONGODB_URI = process.env.MONGODB_URI;

app.get('/', (req, res) => {
  res.send('Server is up and running!');
});





mongoose
  .connect(MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  })
  .then(() => {
    app.listen(PORT, () => console.log(`up and running on ${PORT}`));
  })
  .catch((e) => {
    console.error('CONNECTION ERROR', e.message);
  });