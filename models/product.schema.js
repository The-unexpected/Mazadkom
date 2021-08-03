'use strict';
const mongoose = require('mongoose');

const productSchema = mongoose.Schema({
  // id: { type: String, required: true },
  title: { type: String, required: true },
  picture: { type: String },
  description: { type: String, required: true },
  startingPrice: { type: String }
})

const productModel = mongoose.model('productInst', productSchema);
module.exports = { productModel, productSchema };