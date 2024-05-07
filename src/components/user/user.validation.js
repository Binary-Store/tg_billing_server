const Joi = require('joi');

module.exports = {

  register: {
    body: Joi.object({
      name: Joi.string().required(),
      email: Joi.string().email().required(),
      phone: Joi.string().min(10).max(10).required(),
      password: Joi.string().min(6).max(25).required(),
    }),
  },

  login: {
    body: Joi.object({
      email: Joi.alternatives().try(Joi.string().email(), Joi.string().min(10).max(10)).required(),
      password: Joi.string().min(6).max(25).required(),
    }),
  },

};
