'use strict';

const base64 = require('base-64');
const User = require('../models/users');

module.exports = async (req, res, next) => {

  if (!req.headers.authorization) { return 'error in authorization' }

  console.log('req.header', req.headers.authorization);
  let basic = req.headers.authorization.split(' ');
  if (basic[0] !== 'Basic') { return 'Invalid Login' }
  let [user, pass] = base64.decode(basic[1]).split(':');

  try {
    req.user = await User.authenticateBasic(user, pass);
    next();
  } catch (e) {
    res.status(403).send('Invalid Login');
  }

}