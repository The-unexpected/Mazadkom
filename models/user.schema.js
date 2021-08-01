const mongoose = require('mongoose');
// const productSchema = require('./product.schema');

const userSchema = mongoose.Schema({
  username: { type: String, required: true },
  password: { type: String, required: true },
  image: { type: String },
  // access: { type: Boolean },
  bids: [{// id: of product
    title: { type: String, required: true },
    picture: { type: String },
    description: { type: String, required: true },
    startingPrice: { type: String }
  }]
});


// const userModel = mongoose.model('userInst', userSchema);
module.exports = userSchema;