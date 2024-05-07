/* eslint-disable newline-per-chained-call */
const Joi = require('joi');

module.exports = {

  create: {
    body: Joi.object({
      code: Joi.string().max(10).required(),
      name: Joi.string().max(100).required(),
      price: Joi.number().required(),
      quantity: Joi.number().integer().required(),
      description: Joi.string().max(500),
    }).options({ allowUnknown: false }),
  },

  list: {
    query: Joi.object({
      limit: Joi.number().integer().min(1).max(100).default(10),
      offset: Joi.number().integer().min(0).default(0),
      search: Joi.string().max(100),
    }),
  },

  getById: {
    params: Joi.object({
      id: Joi.string().guid({ version: 'uuidv4' }).required(),
    }),
  },

  update: {
    body: Joi.object({
      code: Joi.string().max(10).required(),
      name: Joi.string().max(100).required(),
      price: Joi.number().required(),
      quantity: Joi.number().integer().required(),
      description: Joi.string().max(500),
    }).options({ allowUnknown: false }),
  },

  delete: {
    params: Joi.object({
      id: Joi.string().guid({ version: 'uuidv4' }).required(),
    }),
  },

};
