// 'use strict';

// // 3rd Party Resources
// const express = require('express');
// const cors = require('cors');
// const morgan = require('morgan');

// // Esoteric Resources
// const errorHandler = require('./error-handlers/500');
// const notFound = require('./error-handlers/404');
// const authRoutes = require('./auth/routes');

// // Prepare the express app
// const app = express();

// // App Level MW
// app.use(cors());
// app.use(morgan('dev'));

// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));

// // Routes
// app.use(authRoutes);

// // prove of life
// app.get('/', (req, res) => {
//   res.status(200).send('Hello Menna !');
// });


// // Catchalls
// app.use(notFound);
// app.use('*', errorHandler);

// module.exports = {
//   server: app

// };
