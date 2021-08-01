'use strict';
require('dotenv').config();
const express = require('express');
const app = express();
const http = require('http');
const PORT = process.env.PORT || 5001;
const cors = require('cors');
app.use(
  cors({
    origin: (origin, callback) => callback(null, true),
    credentials: true
  })
);
const server = http.createServer(app);
const io = require('socket.io')(http);

app.use(express.json());

// app.use(user);
// app.use(ticketsRoute)
io.listen(server);




const mongoose = require('mongoose');
const MONGODB_URI = process.env.MONGODB_URI;
const productRouter = require('./routes/product.route');
// const userRouter = require('./routes/user.route');

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
app.use('/product', productRouter);
app.get('/', (req, res) => {
  res.send('Server is up and running!');
});



app.use(notFound);
app.use('*', errorHandler);


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

