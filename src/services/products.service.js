const { productsModel } = require('../models');

const getAll = async () => {
  const products = await productsModel.getAll();
  return { type: null, message: products };
};

module.exports = {
  getAll,
};