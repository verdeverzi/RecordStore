const createError = require('http-errors');
const User = require('../models/userModel');

exports.auth = async (req, res, next) => {
  // we need to get the token (cookies)
  //   console.log('req.cookies ->', req.cookies);
  const { jwt } = req.cookies;

  try {
    // we need to verify it
    const user = await User.findByToken(jwt);
    if (!user) throw createError('User not found');

    // send it with the request
    req.user = user;
    // next
    next();
  } catch (error) {
    next(error);
  }
};
