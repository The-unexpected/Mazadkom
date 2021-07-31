'use strict';
const express = require('express')
const app = express();
const cors = require('cors');
require('dotenv').config();
const mongoose = require('mongoose');
const PORT = process.env.PORT || 5001;
const MONGODB_URI = process.env.MONGODB_URI;
const productRouter = require('./routes/product.route');
const userRouter = require('./routes/user.route');

app.use(express.json());
app.use(express());
app.use(cors());



app.use('/product', productRouter);
app.use('/user', userRouter);




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

  'use strict';
const express = require('express');
const app = express();
const cors = require('cors');
const http = require("http");
const server = http.createServer(app);
require('dotenv').config();
const mongoose = require('mongoose');
const PORT = process.env.PORT || 5001;
const MONGODB_URI = process.env.MONGODB_URI;
const productRouter = require('./routes/product.route');
const productSchema = require('./models/product.schema');
const userSchema = require('./models/user.schema');


  

app.use(express.json());
app.use(express());
app.use(cors());



app.use('/product', productRouter)




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




//   //sockit
// let io = require("socket.io")(server,{
//     cors:{
//         origins:["*"],

//     }
// })


// const room1 = io.of("/room1");
// const room2 = io.of("/room2");
// const room3 = io.of("/room3");
// const home = io.of("/");

// // let carLast = {};
// // let lastToken = "";
// // let carLastPrice = 0;
// // let flag = true;
// // let carUsers = [];


// room1.on("connection", (socket) => {
//   const socketId = socket.id;
//   socket.on("disconnect", () => {
//     room1Users = room1Users.filter((user) => user.id !== socket.id);
//     room1.emit("room1", { payload: room1Users });
//   });

//   socket.on("increasePrice", (data) => {
//     lastToken = data.token;
//     room1LastPrice = data.lastPrice;
//     car.emit("showLatest", { total: data.lastPrice, name: data.userName });
//   });

//   socket.on("sold", async (data) => {
//     let arrayOfProducts = await productSchema.find({ _id: data.product._id });

//     const soldTo = {
//       name: arrayOfProducts[0].title,
//       price: room1LastPrice,
//       picture: arrayOfProducts[0].picture,
//       description: arrayOfProducts[0].description,
//     };

//     const dbUser = await userSchema.authenticateWithToken(lastToken);
//     const user = await userSchema.findByIdAndUpdate(
//       { _id: dbUser._id },
//       { $push: { cart: soldTo } }
//     );

//     let update = await userSchema.updateOne(
//       {
//         _id: getProduct[0].userId,
//         product: { $elemMatch: { _id: getProduct[0]._id } },
//       },
//       { $set: { "product.$.status": `sold  price ${carLastPrice} ` } }
//     );

//     let deleted = await productSchema.findByIdAndDelete({
//       _id: data.product._id,
//     });

//     lastToken = "";
//     carLastPrice = 0;

//     home.emit("soldEvent", soldTo);
//   });
// });