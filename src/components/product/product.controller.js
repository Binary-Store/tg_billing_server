const Service = require('./product.service');

exports.create = async (req, res, next) => {
  try {
    const product = await Service.create(req.user, req.body);
    res.status(201).json(product);
  } catch (error) {
    next(error);
  }
};

exports.list = async (req, res, next) => {
  try {
    const products = await Service.list(req.user, req.query);
    res.json(products);
  } catch (error) {
    next(error);
  }
};

exports.getById = async (req, res, next) => {
  try {
    const product = await Service.getById(req.user, req.params.id);
    res.json(product);
  } catch (error) {
    next(error);
  }
};

exports.update = async (req, res, next) => {
  try {
    await Service.update(req.user, req.params.id, req.body);
    res.status(204).end();
  } catch (error) {
    next(error);
  }
};

exports.delete = async (req, res, next) => {
  try {
    await Service.delete(req.user, req.params.id);
    res.status(204).end();
  } catch (error) {
    next(error);
  }
};
