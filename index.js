'use strict';
require('dotenv').config();
const express = require('express');
const app = express();
// const morgan = require('morgan');
const cors = require('cors');
const mongoose = require('mongoose');
const http = require('http');
const PORT = process.env.PORT || 5001;
const MONGODB_URI = process.env.MONGODB_URI;
const productRouter = require('./routes/product.route');
const userRouter = require('./routes/user.route');
const server = http.createServer(app);
const io = require('socket.io')(http);
const productSchema = require('./models/product.schema');
const userSchema = require('./models/user.schema'); const { v4: uuidv4 } = require('uuid');

const errorHandler = require('./src/error-handlers/500');
const notFound = require('./src/error-handlers/500');
const authRoutes = require('./src/auth/routes');

// app.use(morgan('dev'));
app.use(express.json());
app.use(express());
app.use(cors());
io.listen(server);
app.use(express.urlencoded({ extended: true }));

//routes to use
app.use('/product', productRouter);
app.get('/', (req, res) => {
  res.send('Server is up and running!');
});
app.use(authRoutes);

app.use(notFound);
app.use('*', errorHandler);

// socket
// io.on('connection', (socket) => {
//   console.log('client is connected', socket.id);

//   socket.join(room1);
//   io.to('room1').emit('welcome to room');


//   socket.on('join', (payload) => {
//     console.log(payload);
//     const admins = { name: payload.adminName, id: socket.id }
//     queue.admins.push(admins);
//     console.log(admins, "payload");

//     socket.to(adminsRoom).emit('onlineAdmins', admins)
//     console.log(queue.admins);
//   });


//   socket.on('createTicket', (payload) => {
//     const ticketDetails = { ...payload, id: uuidv4(), socketId: socket.id };
//     queue.tickets.push(ticketDetails);
//     socket.in(adminsRoom).emit('newTicket', ticketDetails);
//     console.log(payload);
//   });

//   // notify the client when the admin claims the ticket
//   socket.on('claim', (payload) => {
//     console.log(payload);
//     socket.to(payload.clientId).emit('claimed', { name: payload.name });// which admin claimed your ticket
//     queue.tickets = queue.tickets.filter((ticket) => ticket.id !== payload.id);
//   });

//   socket.on('getAll', () => {
//     queue.admins.forEach((human) => {
//       console.log(human);
//       socket.emit('onlineAdmins', { name: human.name, id: human.id });
//     });
//     queue.tickets.forEach((tick) => {
//       socket.emit('newTicket', tick)
//     });
//   })


//   socket.on('disconnect', () => {
//     socket.to(adminsRoom).emit('offlineAdmins', { id: socket.id });
//     queue.admins = queue.admins.filter((s) => s.id !== socket.id);
//   });
// });



// server.listen(PORT, () => {
//   console.log(`server is listening on port ${PORT}`);
// });


mongoose
  .connect(MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  })
  .then(() => {
    server.listen(PORT, () => console.log(`up and running on ${PORT}`));
  })
  .catch((e) => {
    console.error('CONNECTION ERROR', e.message);
  });

