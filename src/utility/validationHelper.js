const { validate } = require('express-validation');

exports.validate = (schema) => validate(schema, { context: true });
