'use strict';
const express = require('express');
const router = express.Router();
const userModel = require('../models/user.schema');
const Interface = require('../models/interface');
const user = new Interface(userModel);


router.get('/', getUser);
router.get('/:id', getUser);
router.post('/', createUser);
router.put('/:id', updateUser);
router.delete('/:id', deleteUser);


async function getUser(req, res, next) {
  try {
    const id = req.params.id;
    const UserInfo = await user.read(id);
    res.json({ UserInfo });
  } catch (e) {
    next(e);
  }
}

async function createUser(req, res, next) {
  try {
    const data = req.body;
    const newUser = await user.create(data);
    res.json(newUser);
  } catch (e) {
    next(e);
  }
}

async function updateUser(req, res, next) {
  try {
    const id = req.params.id;
    const data = req.body;
    const newUser = await user.update(id, data);
    res.json(newUser);
  } catch (e) {
    next(e);
  }
}

async function deleteUser(req, res, next) {
  try {
    const id = req.params.id;
    const deletedUser = await user.delete(id);
    res.json(deletedUser);
  } catch (e) {
    next(e);
  }
}


module.exports = router;