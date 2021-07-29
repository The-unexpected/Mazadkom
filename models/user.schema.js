const mongoose = require('mongoose');
const productSchema = require('./product.schema');

const userSchema = mongoose.Schema({
  name: { type: String, required: true },
  password: { type: String },
  image: { type: String },
  access: { type: Boolean },
  bids: [productSchema]
})


const userModel = mongoose.model('userInst', userSchema);
module.exports = userModel;