'use strict';
require('dotenv').config();
const express = require('express');
const app = express();
const http = require('http');
const PORT = process.env.PORT || 5001;
const cors = require('cors');
// app.use(
//   cors({
//     origin: (origin, callback) => callback(null, true),
//     credentials: true
//   })
// );
const server = http.createServer(app);
const io = require('socket.io')(http, {
  cors: {
    origin: '*',
    credentials: true
  },
});

app.use(express.json());

// app.use(user);
// app.use(ticketsRoute)
io.listen(server);

let counter = 0;




const mongoose = require('mongoose');
const MONGODB_URI = process.env.MONGODB_URI;
const productRouter = require('./routes/product.route');
const userRouter = require('./routes/user.route');

// const io = require('socket.io')(http);
// const productSchema = require('./models/product.schema');
// const userSchema = require('./models/user.schema'); 
// const { v4: uuidv4 } = require('uuid');

const errorHandler = require('./src/error-handlers/500');
const notFound = require('./src/error-handlers/500');
const authRoutes = require('./src/auth/routes');

// app.use(morgan('dev'));
app.use(express());
app.use(express.json());
app.use(cors());
io.listen(server);
app.use(express.urlencoded({ extended: true }));


//routes to use.
app.use(authRoutes);
app.use('/user', userRouter);
app.use('/product', productRouter);
app.get('/', (req, res) => {
  res.send('Server is up and running!');
});



app.use(notFound);
app.use('*', errorHandler);


io.on("connection", (socket) => {


  console.log("socket", socket.id);
  socket.on("message", (message) => {
    socket.broadcast.emit("message", message)
  })

  socket.emit('click_count', counter);

  //when user click the button
  socket.on('clicked', function () {
    counter += 50; //increments global click count


    io.emit('click_count', counter);//send to all users new counter value

  });
  socket.on('getTime', function (msg) {
    io.emit('remainingTime', (bidDuration - process.hrtime(startTime)[0]));
  });

})
// setTimeout(() => {
//     let counter=0;
//   }, 5000);
// }


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

