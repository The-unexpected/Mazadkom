"use strict";
const express = require("express");
const router = express.Router();
const { apiModel } = require("../models/api.product.schema");
const Interface = require("../models/interface");
const productElement = new Interface(apiModel);
// { apiModel, apiSchema };

router.get("/", getProductElement);
router.get("/:id", getProductElement);
router.post("/", createProductElement);
router.put("/:id", updateProductElement);
router.delete("/:id", deleteProductElement);
router.delete("/remove/:title", deleteProductElementByTitle);
router.put("/update/:title", updateProductElementByTitle);

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

async function deleteProductElementByTitle(req, res, next) {
  try {
    const title = req.params.title;
    apiModel.deleteOne({ title: title }, (error, data) => {
      if (error) {
        res.send(error);
      } else {
        res.send(data);
      }
    });
  } catch (e) {
    next(e);
  }
}

async function updateProductElementByTitle(req, res, next) {
  try {
    const name = req.params.title;
    const { title, description, startingPrice, picture } = req.body;
    apiModel.find({ title: name }, (error, data) => {
      if (error) {
        res.send(error);
      } else {
        data[0].title = title ? title : data[0].title;
        data[0].description = description ? description : data[0].description;
        data[0].startingPrice = startingPrice
          ? startingPrice
          : data[0].startingPrice;
        data[0].picture = picture ? picture : data[0].picture;
        data[0].save();
        console.log(data);
        res.send(data);
      }
    });
  } catch (e) {
    next(e);
  }
}

module.exports = router;
