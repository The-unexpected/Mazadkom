const mongoose = require('mongoose');

const apiSchema = mongoose.Schema({
  title: { type: String, required: true },
  picture: { type: String },
  description: { type: String, required: true },
  startingPrice: { type: String }
})

const apiModel = mongoose.model('apiInst', apiSchema);
module.exports = { apiModel, apiSchema };

// when we require a model or a schema always call them with the object curly brackets.