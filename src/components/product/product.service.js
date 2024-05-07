const Dal = require('./product.dal');
const Database = require('../../config/database');

exports.create = async (requestUser, data) => {
  const dbClient = await Database.pool.connect();
  try {
    const product = await Dal.create(dbClient, requestUser.id, data);
    return product;
  } finally {
    dbClient.release();
  }
};

exports.list = async (requestUser, query) => {
  const dbClient = await Database.pool.connect();
  const { limit, offset, search } = query;
  try {
    const products = await Dal.list(dbClient, requestUser.id, limit, offset, search);
    return products;
  } finally {
    dbClient.release();
  }
};

exports.getById = async (requestUser, productId) => {
  const dbClient = await Database.pool.connect();
  try {
    const product = await Dal.getById(dbClient, requestUser.id, productId);
    return product;
  } finally {
    dbClient.release();
  }
};

exports.update = async (requestUser, productId, data) => {
  const dbClient = await Database.pool.connect();
  const timeStamp = new Date().toISOString();
  try {
    await Dal.update(dbClient, requestUser.id, productId, timeStamp, data);
  } finally {
    dbClient.release();
  }
};

exports.delete = async (requestUser, productId) => {
  const dbClient = await Database.pool.connect();
  try {
    await Dal.delete(dbClient, requestUser.id, productId);
  } finally {
    dbClient.release();
  }
};
