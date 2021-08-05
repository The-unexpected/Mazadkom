'use strict';
require('dotenv').config();
const express = require('express');
const app = express();
const http = require('http');
const PORT = process.env.PORT || 5001;
const cors = require('cors');

app.use(express());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(express.json());

const server = http.createServer(app);
const io = require('socket.io')(server, {
  cors: {
    origins: ['*'],
    handlePreflightRequest: (req, res) => {
      res.writeHead(200, {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'POST,GET',
        'Access-Control-Allow-Credentials': true,
      });
      res.end();
    },
  },
});



const mongoose = require('mongoose');
const MONGODB_URI = process.env.MONGODB_URI;
const productRouter = require('./routes/product.route');
const userRouter = require('./routes/user.route');
const apiElementRouter = require('./routes/api.route');

const errorHandler = require('./src/error-handlers/500');
const notFound = require('./src/error-handlers/500');
const authRoutes = require('./src/auth/routes');

//routes to use.
app.use(authRoutes);
app.use('/user', userRouter);
app.use('/apiElement', apiElementRouter);
app.use('/product', productRouter);
app.get('/', (req, res) => {
  res.send('Server is up and running!');
});


let counters = 0;
let runTimer = true;
// socket connection 



io.on("connection", (socket) => {
  // console.log("socket", socket.id);
  socket.on("message", (message) => {
    socket.broadcast.emit("message", message)
  })

  socket.on("print", (data) => {
    socket.broadcast.emit("print", data)
  })
  socket.emit('click_count', counters);// first time??

  //when user click the button
  socket.on('clicked', function () {
    counters += 50; //increments global click count
    io.emit('click_count', counters);//send to all users new counter value

    if (runTimer) {
      runTimer = false
      let timer = 15;
      let WinnerCountdown = setInterval(function () {
        io.sockets.emit('counter', timer);
        timer--;
        if (timer === 0) {
          runTimer = true
          io.sockets.emit('counter', "Times UP");
          clearInterval(WinnerCountdown);
        }

      }, 1000);
    }

  });


  socket.on('clicked1', function () {
    counters += 100; //increments global click count
    io.emit('click_count', counters);//send to all users new counter value


    if (runTimer) {
      runTimer = false
      let timer = 15;
      let WinnerCountdown = setInterval(function () {
        io.sockets.emit('counter', timer);
        timer--;
        if (timer === 0) {
          runTimer = true
          io.sockets.emit('counter', "Times UP");
          clearInterval(WinnerCountdown);
        }

      }, 1000);
    }


  });
  socket.on('clicked2', function () {
    counters += 200; //increments global click count
    io.emit('click_count', counters);//send to all users new counter value


    if (runTimer) {
      runTimer = false
      let timer = 15;
      let WinnerCountdown = setInterval(function () {
        io.sockets.emit('counter', timer);
        timer--;
        if (timer === 0) {
          runTimer = true
          io.sockets.emit('counter', "Times UP");
          clearInterval(WinnerCountdown);
        }

      }, 1000);
    }

  });


  counters = 0;


  socket.on('disconnect', function () {
    console.log('disconnected', socket.id)
  })


  socket.on('winner', function (winner) {
    io.emit('resWinner', winner)
    console.log("responseWinner", winner);
  });


})

app.use(notFound);
app.use('*', errorHandler);

mongoose
  .connect(MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: true,
  })
  .then(() => {
    server.listen(PORT, () => console.log(`up and running on ${PORT}`));
  })
  .catch((e) => {
    console.error('CONNECTION ERROR', e.message);
  });
