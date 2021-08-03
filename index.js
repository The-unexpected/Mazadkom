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

let counters = 0;

const mongoose = require('mongoose');
const MONGODB_URI = process.env.MONGODB_URI;
const productRouter = require('./routes/product.route');
const userRouter = require('./routes/user.route');

const errorHandler = require('./src/error-handlers/500');
const notFound = require('./src/error-handlers/500');
const authRoutes = require('./src/auth/routes');

//routes to use.
app.use(authRoutes);
app.use('/user', userRouter);

app.use('/product', productRouter);
app.get('/', (req, res) => {
  res.send('Server is up and running!');
});

io.on('connection', (socket) => {
  console.log('socket', socket.id);
  socket.on('message', (message) => {
    socket.broadcast.emit('message', message);
  });
  socket.on('message2', (message2) => {
    socket.broadcast.emit('message2', message2);
  });
  socket.on('message3', (message3) => {
    socket.broadcast.emit('message3', message3);
  });
  socket.emit('click1_count', counters);
  socket.emit('click2_count', counters);
  //when user click the button
  socket.on('room111', function () {
  socket.on('clickedroom111', function () {
    counters += 50; //increments global click count
    io.emit('click1_count', counters); //send to all users new counter value

    let counter = 5;
    let WinnerCountdown = setInterval(function () {
      io.sockets.emit('counterroom111', counter);
      counter--;
      if (counter === 0) {
        io.sockets.emit('counterroom111', 'Times UP');
        clearInterval(WinnerCountdown);
      }
    }, 1000);
  });
  socket.on('clicked1room111', function () {
    counters += 100; //increments global click count
    io.emit('click1_count', counters); //send to all users new counter value

    let counter = 5;
    let WinnerCountdown = setInterval(function () {
      io.sockets.emit('counterroom111', counter);
      counter--;
      if (counter === 0) {
        io.sockets.emit('counterroom111', 'Times UP');
        clearInterval(WinnerCountdown);
      }
    }, 1000);
  });
  socket.on('clicked2room111', function () {
    counters += 200; //increments global click count
    io.emit('click1_count', counters); //send to all users new counter value

    let counter = 5;
    let WinnerCountdown = setInterval(function () {
      io.sockets.emit('counterroom111', counter);
      counter--;
      if (counter === 0) {
        io.sockets.emit('counterroom111', 'Times UP');
        clearInterval(WinnerCountdown);
      }
    }, 1000);
  });});
  socket.on('room222', function () {
    socket.on('clickedroom222', function () {
      counters += 50; //increments global click count
      io.emit('click2_count', counters); //send to all users new counter value
  
      let counter = 5;
      let WinnerCountdown = setInterval(function () {
        io.sockets.emit('counterroom222', counter);
        counter--;
        if (counter === 0) {
          io.sockets.emit('counterroom222', 'Times UP');
          clearInterval(WinnerCountdown);
        }
      }, 1000);
    });
    socket.on('clicked1room222', function () {
      counters += 100; //increments global click count
      io.emit('click2_count', counters); //send to all users new counter value
  
      let counter = 5;
      let WinnerCountdown = setInterval(function () {
        io.sockets.emit('counterroom222', counter);
        counter--;
        if (counter === 0) {
          io.sockets.emit('counterroom222', 'Times UP');
          clearInterval(WinnerCountdown);
        }
      }, 1000);
    });
    socket.on('clicked2room222', function () {
      counters += 200; //increments global click count
      io.emit('click2_count', counters); //send to all users new counter value
  
      let counter = 5;
      let WinnerCountdown = setInterval(function () {
        io.sockets.emit('counterroom222', counter);
        counter--;
        if (counter === 0) {
          io.sockets.emit('counterroom222', 'Times UP');
          clearInterval(WinnerCountdown);
        }
      }, 1000);
    });});
    socket.on('room333', function () {
      socket.on('clickedroom333', function () {
        counters += 50; //increments global click count
        io.emit('click3_count', counters); //send to all users new counter value
    
        let counter = 5;
        let WinnerCountdown = setInterval(function () {
          io.sockets.emit('counterroom333', counter);
          counter--;
          if (counter === 0) {
            io.sockets.emit('counterroom333', 'Times UP');
            clearInterval(WinnerCountdown);
          }
        }, 1000);
      });
      socket.on('clicked1room333', function () {
        counters += 100; //increments global click count
        io.emit('click3_count', counters); //send to all users new counter value
    
        let counter = 5;
        let WinnerCountdown = setInterval(function () {
          io.sockets.emit('counterroom333', counter);
          counter--;
          if (counter === 0) {
            io.sockets.emit('counterroom333', 'Times UP');
            clearInterval(WinnerCountdown);
          }
        }, 1000);
      });
      socket.on('clicked2room333', function () {
        counters += 200; //increments global click count
        io.emit('click3_count', counters); //send to all users new counter value
    
        let counter = 5;
        let WinnerCountdown = setInterval(function () {
          io.sockets.emit('counterroom333', counter);
          counter--;
          if (counter === 0) {
            io.sockets.emit('counterroom333', 'Times UP');
            clearInterval(WinnerCountdown);
          }
        }, 1000);
      });});

  socket.on('disconnect', function () {
    console.log('disconnected', socket.id);
  });
});

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
