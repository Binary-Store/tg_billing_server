/* eslint-disable consistent-return */
const jwt = require('jsonwebtoken');

const vars = require('../config/var');

/**
 * Parse user from token
 * - If token is valid, user will be added to req object
 */
const parseUser = (req, res, next) => {
  if (!req.cookies.token) return next();
  jwt.verify(req.cookies.token, vars.jwtSecret, (err, payload) => {
    if (!err && payload) req.user = payload;
    next();
  });
};

module.exports = parseUser;
