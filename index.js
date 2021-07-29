'use strict';

require('dotenv').config();

const server = require('./src/server');
const PORT = process.env.PORT || 3000;
const MONGODB_URI = process.env.MONGODB_URI;

// Start up DB Server
const mongoose = require('mongoose');
const options = {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
};
mongoose.connect(MONGODB_URI, options).then(() => {
  server.start(PORT);
}).catch((e) => { console.log('connection error', e.message); })