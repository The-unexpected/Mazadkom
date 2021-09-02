"use strict";
const express = require("express");
const router = express.Router();
const { postModel } = require("../models/post.schema");
const Interface = require("../models/interface");
const post = new Interface(postModel);
const users = require("../src/auth/models/user.model");

router.get("/", getPost);
router.get("/:id", getPost);
router.post("/:id", createPost);
router.put("/:id", updatePost);
router.delete("/:id", deletePost);

async function getPost(req, res, next) {
  let array = [];
  let userId = req.params.id;
  users.find({ _id: userId }, (error, data) => {
    console.log(data);
    // data[0].posts.map((bid) => {
    //   array.push(bid);
  });
  res.json(array);
  // });
}

async function createPost(req, res, next) {
  try {
    let userId = req.params.id;
    const data1 = req.body;
    const newPost = await post.create(data1);
    users.find({ _id: userId }, (error, data) => {
      data[0].posts.push(newPost);
      data[0].save();
      res.json(data[0].posts);
    });
  } catch (e) {
    console.log(e.message);
  }
}

async function updatePost(req, res, next) {
  try {
    const id = req.params.id;
    const data = req.body;
    const newPost = await post.update(id, data);
    res.json(newPost);
  } catch (e) {
    next(e);
  }
}

async function deletePost(req, res, next) {
  try {
    const id = req.params.id;
    const deletedPost = await post.delete(id);
    res.json(deletedPost);
  } catch (e) {
    next(e);
  }
}

module.exports = router;
