'use strict';
const express = require('express');
const router = express.Router();
const { apiModel } = require('../models/api.product.schema');
const Interface = require('../models/interface');
const productElement = new Interface(apiModel);
// { apiModel, apiSchema };

router.get('/', getProductElement);
router.get('/:id', getProductElement);
router.post('/', createProductElement);
router.put('/:id', updateProductElement);
router.delete('/:id', deleteProductElement);


async function getProductElement(req, res, next) {
  try {
    const id = req.params.id;
    const productElementInfo = await productElement.read(id);
    res.json({ productElementInfo });
  } catch (e) {
    next(e);
  }
}

async function createProductElement(req, res, next) {
  try {
    const data = req.body;
    const newproductElement = await productElement.create(data);
    res.json(newproductElement);
  } catch (e) {
    next(e);
  }
}

async function updateProductElement(req, res, next) {
  try {
    const id = req.params.id;
    const data = req.body;
    const newproductElement = await productElement.update(id, data);
    res.json(newproductElement);
  } catch (e) {
    next(e);
  }
}

async function deleteProductElement(req, res, next) {
  try {
    const id = req.params.id;
    const deletedproductElement = await productElement.delete(id);
    res.json(deletedproductElement);
  } catch (e) {
    next(e);
  }
}


module.exports = router;