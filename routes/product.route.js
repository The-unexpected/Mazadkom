'use strict';
const express = require('express');
const router = express.Router();
const productModel = require('../models/product.schema');
const Interface = require('../models/interface');
const product = new Interface(productModel);


router.get('/', getProduct);
router.get('/:id', getProduct);
router.post('/', createProduct);
router.put('/:id', updateProduct);
router.delete('/:id', deleteProduct);


async function getProduct(req, res, next) {
  try {
    const id = req.params.id;
    const ProductInfo = await product.read(id);
    res.json({ ProductInfo });
  } catch (e) {
    next(e);
  }
}

async function createProduct(req, res, next) {
  try {
    const data = req.body;
    const newProduct = await product.create(data);
    res.json(newProduct);
  } catch (e) {
    next(e);
  }
}

async function updateProduct(req, res, next) {
  try {
    const id = req.params.id;
    const data = req.body;
    const newProduct = await product.update(id, data);
    res.json(newProduct);
  } catch (e) {
    next(e);
  }
}

async function deleteProduct(req, res, next) {
  try {
    const id = req.params.id;
    const deletedProduct = await product.delete(id);
    res.json(deletedProduct);
  } catch (e) {
    next(e);
  }
}


module.exports = router;