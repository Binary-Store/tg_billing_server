const express = require('express');
const Controller = require('./product.controller');
const { validate } = require('../../utility/validationHelper');
const validation = require('./product.validation');
const isLoggedIn = require('../../middleware/isLoggedIn');

const router = express.Router();

/**
 * @swagger
 * /products:
 *   get:
 *     tags:
 *       - Product
 *     description: List all products
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: limit
 *         in: query
 *         description: Limit of products
 *         type: number
 *       - name: offset
 *         in: query
 *         description: Offset of products
 *         type: number
 *       - name: search
 *         in: query
 *         description: Search term
 *         type: string
 *     responses:
 *       200:
 *         description: List of products
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: 'components/product.yaml#/list/response'
 */
router.route('/')
  .get(isLoggedIn, Controller.list)
/**
 * @swagger
 * /products:
 *   post:
 *     tags:
 *       - Product
 *     description: Create a new product
 *     produces:
 *       - application/json
 *     requestBody:
 *       description: Product data
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: 'components/product.yaml#/create/request'
 *     responses:
 *       200:
 *         description: Product created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: 'components/product.yaml#/create/response'
 */
  .post(isLoggedIn, validate(validation.create), Controller.create);

/**
 * @swagger
 * /products/{id}:
 *   get:
 *     tags:
 *       - Product
 *     description: Get product by id
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: id
 *         in: path
 *         description: Product id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Product data
 *         content:
 *           application/json:
 *             schema:
 *               $ref: 'components/product.yaml#/getById/response'
 */
router.route('/:id')
  .get(isLoggedIn, validate(validation.getById), Controller.getById)
/**
 * @swagger
 * /products/{id}:
 *   put:
 *     tags:
 *       - Product
 *     description: Update product by id
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: id
 *         in: path
 *         description: Product id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       description: Product data
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: 'components/product.yaml#/update/request'
 *     responses:
 *       204:
 *         description: Product updated
 */
  .put(isLoggedIn, validate(validation.update), Controller.update)
/**
 * @swagger
 * /products/{id}:
 *   delete:
 *     tags:
 *       - Product
 *     description: Delete product by id
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: id
 *         in: path
 *         description: Product id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       204:
 *         description: Product deleted
 */
  .delete(isLoggedIn, validate(validation.delete), Controller.delete);

module.exports = router;
