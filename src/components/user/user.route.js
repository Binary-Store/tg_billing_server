const express = require('express');
const Controller = require('./user.controller');
const { validate } = require('../../utility/validationHelper');
const validation = require('./user.validation');

const router = express.Router();

/**
 * @swagger
 * /users/register:
 *   post:
 *     tags:
 *       - User
 *     description: Register a new user
 *     produces:
 *       - application/json
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             $ref: 'components/user.yaml#/register/request'
 *     responses:
 *       200:
 *         description: User registered successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: 'components/user.yaml#/register/response'
 */
router.route('/register')
  .post(validate(validation.register), Controller.register);

/**
 * @swagger
 * /users/login:
 *   post:
 *     tags:
 *       - User
 *     description: Login a user
 *     produces:
 *       - application/json
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             $ref: 'components/user.yaml#/login/request'
 *     responses:
 *       200:
 *         description: User logged in successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: 'components/user.yaml#/login/response'
 */
router.route('/login')
  .post(validate(validation.login), Controller.login);

module.exports = router;
