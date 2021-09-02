const mongoose = require("mongoose");
const { productSchema } = require("./product.schema");
const { postSchema } = require("./post.schema");

const userSchema = mongoose.Schema(
  {
    username: { type: String, required: true },
    password: { type: String, required: true },
    image: { type: String },
    acl: { type: String },
    posts: [postSchema],
    bids: [productSchema],
  },
  {
    toJSON: { virtuals: true },
  }
);

// const userModel = mongoose.model('userInst', userSchema);
module.exports = userSchema;
