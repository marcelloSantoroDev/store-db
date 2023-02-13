const { productsService } = require('../services');

const getAll = async (_req, res) => {
  const products = await productsService.getAll();
  return res.status(200).json({ type: null, message: products });
};

module.exports = {
  getAll,
};