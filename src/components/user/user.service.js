/* eslint-disable no-multiple-empty-lines */
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Dal = require('./user.dal');
const vars = require('../../config/var');
const Database = require('../../config/database');



/**
 * Creates a new user with the provided data.
 */
exports.create = async (data) => {
  const { name, email, phone, password } = data;
  const dbClient = await Database.pool.connect();

  try {
    const encryptedPassword = await bcrypt.hash(password, 7);
    const timeStamp = new Date().toISOString();

    const user = await Dal.create(dbClient, name, email, phone, encryptedPassword, timeStamp);
    return user;
  } finally {
    dbClient.release();
  }
};




/**
 * Logs in a user with the provided email and password.
 * @param {*} email
 * @param {*} password
 */
exports.login = async (email, password) => {
  const dbClient = await Database.pool.connect();
  let user;

  try {
    user = await Dal.getByEmail(dbClient, email);
  } finally {
    dbClient.release();
  }

  if (!user) throw new Error('NOT_FOUND');

  const isPasswordValid = await bcrypt.compare(password, user.password);

  if (!isPasswordValid) throw new Error('INVALID_DATA');

  delete user.password;

  const token = jwt.sign({ id: user.id }, vars.jwtSecret, { expiresIn: '1d' });

  return { token, user };
};
