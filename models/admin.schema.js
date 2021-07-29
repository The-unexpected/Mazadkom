'use strict';
const mongoose = require('mongoose');
const productSchema = require('./product.schema');

const adminSchema = mongoose.Schema({
  name: { type: String, required: true },
  password: { type: String },
  image: { type: String },
  access: { type: Boolean },
  products: [productSchema]
})


const adminModel = mongoose.model('adminInst', adminSchema);
module.exports = adminModel;