"use strict";

const express = require("express");
const router = express.Router();
const { productModel } = require("../models/product.schema");
const Interface = require("../models/interface");
const product = new Interface(productModel);
const users = require("../src/auth/models/user.model");

// router.get('/', getProduct);
router.get("/:id", getProduct);
router.post("/:id", createProduct);
// router.put('/:id', updateProduct);
// router.delete('/:id', deleteProduct);

async function getProduct(req, res, next) {
  let array = [];
  let userId = req.params.id;
  users.find({ _id: userId }, (error, data) => {
    data[0].bids.map((bid) => {
      array.push(bid);
    });
    res.json(array);
  });
}

async function createProduct(req, res, next) {
  try {
    let userId = req.params.id;
    const data1 = req.body;
    const newProduct = await product.create(data1);
    users.find({ _id: userId }, (error, data) => {
      data[0].bids.push(newProduct);
      data[0].save();
      res.json(data[0].bids);
    });
  } catch (e) {
    console.log(e.message);
  }
}

// async function updateProduct(req, res, next) {
//   try {
//     const id = req.params.id;
//     const data = req.body;
//     const newProduct = await product.update(id, data);
//     res.json(newProduct);
//   } catch (e) {
//     next(e);
//   }
// }

// async function deleteProduct(req, res, next) {
//   try {
//     const id = req.params.id;
//     const deletedProduct = await product.delete(id);
//     res.json(deletedProduct);
//   } catch (e) {
//     next(e);
//   }
// }

module.exports = router;
