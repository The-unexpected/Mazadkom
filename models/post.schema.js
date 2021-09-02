"use strict";
const mongoose = require("mongoose");

const postSchema = mongoose.Schema({
  // id: { type: String, required: true },
  title: { type: String, required: true },
  picture: { type: String },
  description: { type: String, required: true },
  startingPrice: { type: String },
});

const postModel = mongoose.model("postInst", postSchema);
module.exports = { postModel, postSchema };
